# CiteMe

CiteMe is a web application designed to help users generate properly formatted citations for academic and professional documents. The app leverages client-side processing for text comparison and the OpenAI API for citation formatting.

## Features

- **Client-Side PDF Processing**: Upload and process PDFs entirely in the browser
- **Intelligent Text Comparison**: Fast, client-side comparison of your text against reference documents
- **AI-Powered Citation Formatting**: Uses OpenAI API to ensure citations match the required style
- **Multiple Citation Styles**: Supports APA, MLA, Chicago, OSCOLA, IEEE, and AMA
- **Interactive Editor**: Review and edit generated citations
- **Bibliography Generation**: Automatically compile properly formatted bibliographies

## Technology Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **PDF Processing**: pdf.js
- **Text Comparison**: Fuse.js with Web Workers for parallel processing
- **Database**: Client-side storage with IndexedDB
- **Citation Generation**: OpenAI API
- **UI Components**: React components with virtualized rendering for large documents

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Stephan-Marie/cite-me-v2.git
   cd cite-me
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create an `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Upload your document (the "masterpiece")
2. Upload reference documents
3. Choose your preferred citation style
4. Get citations and a bibliography

## Project Structure

- `src/app` - Next.js app router pages
- `src/components` - Reusable React components
- `src/hooks` - Custom React hooks
- `src/services` - Services for data storage and processing
- `src/types` - TypeScript types and interfaces
- `src/utils` - Utility functions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
