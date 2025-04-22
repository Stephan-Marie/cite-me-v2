# CiteMe Web App Functionality & User Journey

# Product Requirement Document here: https://www.notion.so/CiteMe-Product-Requirement-Document-1d037d66eeb9804583d0e4dd1e12e117?pvs=4

## Core Functionality
CiteMe is a web application designed to help users generate citations for academic and professional documents. The app leverages client-side processing for text comparison and OpenAI API for citation formatting.

### Key Features
1. **PDF Processing & Text Comparison**
   - File Upload: Users can upload PDF files
   - Support for both reference documents and a "masterpiece" document
   - Automatic metadata extraction using pdf.js
   - Client-side text comparison using:
     - Fuse.js for fuzzy matching and similarity scoring
     - Web workers for parallel processing without blocking UI
     - Efficient chunking of text for manageable comparison
   - Local browser storage for processed text to avoid re-processing

2. **Citation Generation with OpenAI**
   - OpenAI GPT-4 Turbo integration specifically for:
     - Formatting matched text into proper citations
     - Ensuring citation style compliance
     - Handling edge cases in citation formatting
   - Supports multiple academic citation styles:
     - APA
     - MLA
     - Chicago
     - OSCOLA
     - IEEE
     - AMA
   - Smart batching of citation requests:
     - Group similar citations to minimize API calls
     - Rate limiting and request throttling
     - Caching of common citation patterns

3. **Output Options**
   - Rich text editor for citation editing
   - Real-time preview of formatted citations
   - Export options for bibliography
   - Citation history tracking
   - Progress monitoring for both processing steps

## User Journey

### 1. Initial Access
- User lands on the main page
- Clear interface explaining the two-step process:
  1. Text matching (fast, client-side)
  2. Citation formatting (API-based)

### 2. File Upload & Processing
1. User uploads "masterpiece" PDF
2. Document is processed locally:
   - Text extraction via pdf.js
   - Content chunking for efficient processing
   - Metadata extraction (title, authors, date)
3. Progress shown for each processing step

### 3. Reference Processing
- Upload multiple reference PDFs
- Parallel processing using web workers:
  - Text extraction
  - Metadata parsing
  - Content preparation for comparison
- Local storage of processed text
- Batch processing with progress indicators

### 4. Text Comparison (Client-side)
1. Fuse.js performs fuzzy matching:
   - Configurable threshold for match accuracy
   - Similarity scoring for each potential match
   - Handling of partial matches and variations
2. Web workers execute in parallel:
   - Each worker handles a subset of comparisons
   - Results aggregated and ranked
   - Memory-efficient processing
3. Match review interface:
   - Highlight matched text
   - Show similarity scores
   - Allow manual adjustment

### 5. Citation Generation (OpenAI)
1. User selects citation style
2. Matched text is batched efficiently:
   - Similar citations grouped together
   - Priority queue for processing
3. OpenAI API calls are optimized:
   - Clear prompting for citation formatting
   - Context includes style guide requirements
   - Validation of generated citations
4. Smart caching:
   - Store formatted citations
   - Reuse for identical matches
   - Version tracking for style updates

### 6. Citation Review & Export
- Interactive editor for citation refinement
- Real-time validation of citation format
- Export options for different formats
- Citation history and versioning
- Automatic save and recovery

## Technical Implementation
- Next.js + TypeScript foundation
- PDF Processing: pdf.js (client-side)
- Text Comparison Stack:
  - Fuse.js for fuzzy matching
  - Web Workers for parallel processing
  - IndexedDB for local storage
- Citation Formatting:
  - OpenAI GPT-4 Turbo API
  - Request batching and caching
  - Rate limiting implementation
- UI Components:
  - React-window for virtualized rendering
  - Rich text editor for citation management
  - Progress tracking system
  - Error handling and recovery

## Performance Optimizations
- Client-side text comparison to minimize API usage
- Efficient text chunking and processing
- Smart batching of OpenAI requests
- Progressive loading of large documents
- Caching at multiple levels:
  - Processed text (IndexedDB)
  - Citation formats (localStorage)
  - API responses (React Query)

## Error Handling
- Comprehensive validation:
  - File formats and sizes
  - Text extraction quality
  - Citation formatting accuracy
- Graceful degradation
- Clear error messages
- Automatic retry mechanisms
- Session recovery options

## Future Enhancements
- DOCX export functionality
- Bulk citation processing
- Enhanced matching algorithms
- Citation style preview
- Collaborative editing features
- Extended offline capabilities
- API usage analytics
