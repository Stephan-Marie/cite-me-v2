import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import { v4 as uuidv4 } from 'uuid';
import { PDFMetadata, ProcessedPDF, PDFPageContent, PDFTextChunk, PDFType } from '../types/pdf';

// Set the worker source for pdf.js - using a specific version instead of accessing from getDocument
const PDFJS_VERSION = '3.11.174'; // Update this to match your pdf.js version
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

// Configuration for chunk size (in characters)
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

/**
 * Process a PDF file and extract its text content, metadata, and create chunks
 */
export async function processPDF(file: File, type: PDFType): Promise<ProcessedPDF> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    
    const metadata = await extractMetadata(pdf);
    const pages = await extractPages(pdf);
    const chunks = createChunks(pages, CHUNK_SIZE, CHUNK_OVERLAP);
    
    const processedPDF: ProcessedPDF = {
      id: uuidv4(),
      filename: file.name,
      metadata,
      pages,
      totalPages: pdf.numPages,
      chunks,
    };
    
    return processedPDF;
  } catch (error: unknown) {
    console.error('Error processing PDF:', error);
    throw new Error(`Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extract metadata from a PDF document
 */
async function extractMetadata(pdf: PDFDocumentProxy): Promise<PDFMetadata> {
  try {
    const metadataObj = await pdf.getMetadata();
    const info = metadataObj.info as Record<string, any> | undefined;
    
    return {
      title: info?.Title as string | undefined,
      author: info?.Author as string | undefined,
      subject: info?.Subject as string | undefined,
      keywords: info?.Keywords as string | undefined,
      creator: info?.Creator as string | undefined,
      producer: info?.Producer as string | undefined,
      creationDate: info?.CreationDate ? new Date(info.CreationDate as string) : undefined,
      modificationDate: info?.ModDate ? new Date(info.ModDate as string) : undefined,
    };
  } catch (error: unknown) {
    console.warn('Error extracting metadata:', error);
    return {};
  }
}

/**
 * Extract text content from all pages of a PDF
 */
async function extractPages(pdf: PDFDocumentProxy): Promise<PDFPageContent[]> {
  const pages: PDFPageContent[] = [];
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const textItems = textContent.items;
    
    let pageText = '';
    let lastY: number | null = null;
    
    for (const item of textItems) {
      if ('str' in item) {
        // Add newline if Y position changes significantly
        if (lastY !== null && Math.abs(lastY - item.transform[5]) > 5) {
          pageText += '\n';
        }
        
        pageText += item.str;
        lastY = item.transform[5];
      }
    }
    
    pages.push({
      pageNumber: i,
      text: pageText.trim(),
    });
  }
  
  return pages;
}

/**
 * Create text chunks from page content for efficient processing
 */
function createChunks(pages: PDFPageContent[], chunkSize: number, overlap: number): PDFTextChunk[] {
  const chunks: PDFTextChunk[] = [];
  const pdfId = uuidv4();
  
  for (const page of pages) {
    const { text, pageNumber } = page;
    
    if (text.length < chunkSize) {
      // If the page content is smaller than chunk size, create a single chunk
      chunks.push({
        id: uuidv4(),
        text,
        pageNumber,
        startIndex: 0,
        endIndex: text.length,
        pdfId,
      });
    } else {
      // Split page content into overlapping chunks
      let startIndex = 0;
      
      while (startIndex < text.length) {
        const endIndex = Math.min(startIndex + chunkSize, text.length);
        
        chunks.push({
          id: uuidv4(),
          text: text.substring(startIndex, endIndex),
          pageNumber,
          startIndex,
          endIndex,
          pdfId,
        });
        
        startIndex = endIndex - overlap;
        
        // If the remaining text is smaller than the overlap, we're done
        if (startIndex + overlap >= text.length) {
          break;
        }
      }
    }
  }
  
  return chunks;
}

/**
 * Calculate a unique and stable hash for a text chunk to use for caching
 */
export function hashTextChunk(text: string): string {
  // Simple hash function for demo purposes
  // In production, use a proper hash function
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
} 