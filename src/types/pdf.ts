export interface PDFMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
}

export interface PDFPageContent {
  pageNumber: number;
  text: string;
}

export interface ProcessedPDF {
  id: string;
  filename: string;
  metadata: PDFMetadata;
  pages: PDFPageContent[];
  totalPages: number;
  chunks: PDFTextChunk[];
}

export interface PDFTextChunk {
  id: string;
  text: string;
  pageNumber: number;
  startIndex: number;
  endIndex: number;
  pdfId: string;
}

export interface PDFMatch {
  id: string;
  sourceChunkId: string;
  referenceChunkId: string;
  sourceText: string;
  referenceText: string;
  score: number;
  pageNumber: number;
  referencePageNumber: number;
  referenceFilename: string;
}

export type PDFType = 'masterpiece' | 'reference';

export interface UploadedPDF {
  id: string;
  file: File;
  type: PDFType;
  status: 'pending' | 'processing' | 'processed' | 'error';
  progress: number;
  error?: string;
} 