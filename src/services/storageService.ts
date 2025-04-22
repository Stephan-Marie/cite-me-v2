import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { ProcessedPDF, PDFTextChunk, PDFMatch } from '../types/pdf';
import { Citation, CitationBatch } from '../types/citation';

// Define database store names as constants for type safety
const STORE_PROCESSED_PDFS = 'processedPDFs';
const STORE_PDF_CHUNKS = 'pdfChunks';
const STORE_PDF_MATCHES = 'pdfMatches';
const STORE_CITATIONS = 'citations';
const STORE_CITATION_BATCHES = 'citationBatches';

// Define the store names type for better type safety
type StoreNames = 
  typeof STORE_PROCESSED_PDFS | 
  typeof STORE_PDF_CHUNKS | 
  typeof STORE_PDF_MATCHES | 
  typeof STORE_CITATIONS | 
  typeof STORE_CITATION_BATCHES;

// Define the database schema
interface CitemeDatabaseSchema extends DBSchema {
  [STORE_PROCESSED_PDFS]: {
    key: string;
    value: ProcessedPDF;
    indexes: { 'by-filename': string };
  };
  [STORE_PDF_CHUNKS]: {
    key: string;
    value: PDFTextChunk;
    indexes: { 'by-pdfId': string };
  };
  [STORE_PDF_MATCHES]: {
    key: string;
    value: PDFMatch;
    indexes: { 'by-sourceChunkId': string; 'by-referenceChunkId': string };
  };
  [STORE_CITATIONS]: {
    key: string;
    value: Citation;
    indexes: { 'by-matchId': string; 'by-style': string };
  };
  [STORE_CITATION_BATCHES]: {
    key: string;
    value: CitationBatch;
    indexes: { 'by-style': string };
  };
}

// Database version
const DB_VERSION = 1;
const DB_NAME = 'citeme-db';

// Singleton instance of the database connection
let dbPromise: Promise<IDBPDatabase<CitemeDatabaseSchema>> | null = null;

/**
 * Initialize the database connection
 */
export async function initDatabase(): Promise<IDBPDatabase<CitemeDatabaseSchema>> {
  if (!dbPromise) {
    dbPromise = openDB<CitemeDatabaseSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create stores if they don't exist
        if (!db.objectStoreNames.contains(STORE_PROCESSED_PDFS)) {
          const pdfStore = db.createObjectStore(STORE_PROCESSED_PDFS, { keyPath: 'id' });
          pdfStore.createIndex('by-filename', 'filename');
        }
        
        if (!db.objectStoreNames.contains(STORE_PDF_CHUNKS)) {
          const chunksStore = db.createObjectStore(STORE_PDF_CHUNKS, { keyPath: 'id' });
          chunksStore.createIndex('by-pdfId', 'pdfId');
        }
        
        if (!db.objectStoreNames.contains(STORE_PDF_MATCHES)) {
          const matchesStore = db.createObjectStore(STORE_PDF_MATCHES, { keyPath: 'id' });
          matchesStore.createIndex('by-sourceChunkId', 'sourceChunkId');
          matchesStore.createIndex('by-referenceChunkId', 'referenceChunkId');
        }
        
        if (!db.objectStoreNames.contains(STORE_CITATIONS)) {
          const citationsStore = db.createObjectStore(STORE_CITATIONS, { keyPath: 'id' });
          citationsStore.createIndex('by-matchId', 'matchId');
          citationsStore.createIndex('by-style', 'style');
        }
        
        if (!db.objectStoreNames.contains(STORE_CITATION_BATCHES)) {
          const batchesStore = db.createObjectStore(STORE_CITATION_BATCHES, { keyPath: 'id' });
          batchesStore.createIndex('by-style', 'style');
        }
      },
    });
  }
  
  return dbPromise;
}

// PDF Storage Operations
export async function savePDF(pdf: ProcessedPDF): Promise<string> {
  const db = await initDatabase();
  const tx = db.transaction(STORE_PROCESSED_PDFS, 'readwrite');
  await tx.store.put(pdf);
  await tx.done;
  return pdf.id;
}

export async function getPDF(id: string): Promise<ProcessedPDF | undefined> {
  const db = await initDatabase();
  return db.get(STORE_PROCESSED_PDFS, id);
}

export async function getPDFByFilename(filename: string): Promise<ProcessedPDF | undefined> {
  const db = await initDatabase();
  return db.getFromIndex(STORE_PROCESSED_PDFS, 'by-filename', filename);
}

export async function getAllPDFs(): Promise<ProcessedPDF[]> {
  const db = await initDatabase();
  return db.getAll(STORE_PROCESSED_PDFS);
}

export async function deletePDF(id: string): Promise<void> {
  const db = await initDatabase();
  const tx = db.transaction(STORE_PROCESSED_PDFS, 'readwrite');
  await tx.store.delete(id);
  await tx.done;
}

// PDF Chunks Operations
export async function saveChunks(chunks: PDFTextChunk[]): Promise<void> {
  const db = await initDatabase();
  const tx = db.transaction(STORE_PDF_CHUNKS, 'readwrite');
  await Promise.all(chunks.map(chunk => tx.store.put(chunk)));
  await tx.done;
}

export async function getChunksByPDFId(pdfId: string): Promise<PDFTextChunk[]> {
  const db = await initDatabase();
  return db.getAllFromIndex(STORE_PDF_CHUNKS, 'by-pdfId', pdfId);
}

// PDF Matches Operations
export async function saveMatch(match: PDFMatch): Promise<string> {
  const db = await initDatabase();
  const tx = db.transaction(STORE_PDF_MATCHES, 'readwrite');
  await tx.store.put(match);
  await tx.done;
  return match.id;
}

export async function getMatchesBySourceChunk(sourceChunkId: string): Promise<PDFMatch[]> {
  const db = await initDatabase();
  return db.getAllFromIndex(STORE_PDF_MATCHES, 'by-sourceChunkId', sourceChunkId);
}

export async function getAllMatches(): Promise<PDFMatch[]> {
  const db = await initDatabase();
  return db.getAll(STORE_PDF_MATCHES);
}

// Citation Operations
export async function saveCitation(citation: Citation): Promise<string> {
  const db = await initDatabase();
  const tx = db.transaction(STORE_CITATIONS, 'readwrite');
  await tx.store.put(citation);
  await tx.done;
  return citation.id;
}

export async function getCitationsByMatch(matchId: string): Promise<Citation[]> {
  const db = await initDatabase();
  return db.getAllFromIndex(STORE_CITATIONS, 'by-matchId', matchId);
}

export async function getCitationsByStyle(style: string): Promise<Citation[]> {
  const db = await initDatabase();
  return db.getAllFromIndex(STORE_CITATIONS, 'by-style', style);
}

// Citation Batch Operations
export async function saveBatch(batch: CitationBatch): Promise<string> {
  const db = await initDatabase();
  const tx = db.transaction(STORE_CITATION_BATCHES, 'readwrite');
  await tx.store.put(batch);
  await tx.done;
  return batch.id;
}

export async function getBatch(id: string): Promise<CitationBatch | undefined> {
  const db = await initDatabase();
  return db.get(STORE_CITATION_BATCHES, id);
}

export async function getBatchesByStyle(style: string): Promise<CitationBatch[]> {
  const db = await initDatabase();
  return db.getAllFromIndex(STORE_CITATION_BATCHES, 'by-style', style);
}

/**
 * Clear all data from the database (useful for testing or resetting)
 */
export async function clearDatabase(): Promise<void> {
  const db = await initDatabase();
  // Create an array of store names with the correct type
  const stores: StoreNames[] = [
    STORE_PROCESSED_PDFS, 
    STORE_PDF_CHUNKS, 
    STORE_PDF_MATCHES, 
    STORE_CITATIONS, 
    STORE_CITATION_BATCHES
  ];
  
  // Process each store individually to maintain type safety
  for (const store of stores) {
    const tx = db.transaction(store, 'readwrite');
    await tx.objectStore(store).clear();
    await tx.done;
  }
} 