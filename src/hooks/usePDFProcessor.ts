import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { processPDF } from '../utils/pdfProcessor';
import { savePDF, saveChunks } from '../services/storageService';
import { ProcessedPDF, UploadedPDF, PDFType } from '../types/pdf';

interface UsePDFProcessorReturn {
  uploadedPDFs: UploadedPDF[];
  processedPDFs: ProcessedPDF[];
  isProcessing: boolean;
  addPDF: (file: File, type: PDFType) => void;
  removePDF: (id: string) => void;
  clearAll: () => void;
}

export function usePDFProcessor(): UsePDFProcessorReturn {
  const [uploadedPDFs, setUploadedPDFs] = useState<UploadedPDF[]>([]);
  const [processedPDFs, setProcessedPDFs] = useState<ProcessedPDF[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addPDF = useCallback(async (file: File, type: PDFType) => {
    // Create a new uploaded PDF entry
    const newPDF: UploadedPDF = {
      id: uuidv4(),
      file,
      type,
      status: 'pending',
      progress: 0,
    };

    // Add to uploaded PDFs list
    setUploadedPDFs(prevPDFs => [...prevPDFs, newPDF]);

    // Start processing
    setIsProcessing(true);
    try {
      // Update status to processing
      setUploadedPDFs(prevPDFs =>
        prevPDFs.map(pdf =>
          pdf.id === newPDF.id
            ? { ...pdf, status: 'processing', progress: 10 }
            : pdf
        )
      );

      // Process the PDF
      const processedPDF = await processPDF(file, type);

      // Update progress
      setUploadedPDFs(prevPDFs =>
        prevPDFs.map(pdf =>
          pdf.id === newPDF.id
            ? { ...pdf, progress: 50 }
            : pdf
        )
      );

      // Save to storage
      await savePDF(processedPDF);
      await saveChunks(processedPDF.chunks);

      // Update progress and status
      setUploadedPDFs(prevPDFs =>
        prevPDFs.map(pdf =>
          pdf.id === newPDF.id
            ? { ...pdf, status: 'processed', progress: 100 }
            : pdf
        )
      );

      // Add to processed PDFs list
      setProcessedPDFs(prevPDFs => [...prevPDFs, processedPDF]);

    } catch (error: unknown) {
      console.error('Error processing PDF:', error);
      
      // Update status to error with a safe error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      setUploadedPDFs(prevPDFs =>
        prevPDFs.map(pdf =>
          pdf.id === newPDF.id
            ? { ...pdf, status: 'error', error: errorMessage }
            : pdf
        )
      );
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const removePDF = useCallback((id: string) => {
    setUploadedPDFs(prevPDFs => prevPDFs.filter(pdf => pdf.id !== id));
    setProcessedPDFs(prevPDFs => prevPDFs.filter(pdf => pdf.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setUploadedPDFs([]);
    setProcessedPDFs([]);
  }, []);

  return {
    uploadedPDFs,
    processedPDFs,
    isProcessing,
    addPDF,
    removePDF,
    clearAll
  };
} 