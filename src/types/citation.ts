export type CitationStyle = 'APA' | 'MLA' | 'Chicago' | 'OSCOLA' | 'IEEE' | 'AMA';

export interface Citation {
  id: string;
  matchId: string;
  style: CitationStyle;
  formattedCitation: string;
  sourceText: string;
  referenceText: string;
  sourceLocation: {
    pageNumber: number;
    startIndex: number;
    endIndex: number;
  };
  metadata: {
    title?: string;
    author?: string;
    year?: string;
    publisher?: string;
    url?: string;
    doi?: string;
    pages?: string;
    volume?: string;
    issue?: string;
    journal?: string;
  };
  inText: string;
  bibliography: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CitationBatch {
  id: string;
  citations: Citation[];
  style: CitationStyle;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CitationRequest {
  matchId: string;
  sourceText: string;
  referenceText: string;
  sourceMetadata: {
    title?: string;
    author?: string;
    year?: string;
    pages?: string;
  };
  referenceMetadata: {
    title?: string;
    author?: string;
    year?: string;
    publisher?: string;
    url?: string;
    doi?: string;
    pages?: string;
    volume?: string;
    issue?: string;
    journal?: string;
  };
  style: CitationStyle;
} 