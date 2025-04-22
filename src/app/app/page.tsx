'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePDFProcessor } from '../../hooks/usePDFProcessor';
import FileUpload from '../../components/FileUpload';
import ProgressBar from '../../components/ProgressBar';
import { UploadedPDF } from '../../types/pdf';

export default function AppPage() {
  const { uploadedPDFs, processedPDFs, isProcessing, addPDF, removePDF } = usePDFProcessor();
  const [activeStep, setActiveStep] = useState<'upload' | 'compare' | 'cite'>('upload');
  
  // Filter PDFs by type
  const masterpiece = uploadedPDFs.find(pdf => pdf.type === 'masterpiece');
  const references = uploadedPDFs.filter(pdf => pdf.type === 'reference');
  
  // Handle file uploads
  const handleMasterpieceUpload = (pdf: UploadedPDF) => {
    addPDF(pdf.file, 'masterpiece');
  };
  
  const handleReferenceUpload = (pdf: UploadedPDF) => {
    addPDF(pdf.file, 'reference');
  };
  
  // Handle step navigation
  const goToCompareStep = () => {
    if (masterpiece && references.length > 0) {
      setActiveStep('compare');
    }
  };
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl font-bold mt-2">CiteMe App</h1>
      </div>
      
      {/* Step Indicator */}
      <div className="flex items-center mb-8">
        <div className={`flex items-center ${activeStep === 'upload' ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${activeStep === 'upload' ? 'border-primary' : 'border-muted'}`}>
            1
          </div>
          <span className="ml-2">Upload</span>
        </div>
        <div className="w-12 h-1 mx-2 bg-muted"></div>
        <div className={`flex items-center ${activeStep === 'compare' ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${activeStep === 'compare' ? 'border-primary' : 'border-muted'}`}>
            2
          </div>
          <span className="ml-2">Compare</span>
        </div>
        <div className="w-12 h-1 mx-2 bg-muted"></div>
        <div className={`flex items-center ${activeStep === 'cite' ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${activeStep === 'cite' ? 'border-primary' : 'border-muted'}`}>
            3
          </div>
          <span className="ml-2">Cite</span>
        </div>
      </div>
      
      {/* Upload Step */}
      {activeStep === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Masterpiece Upload */}
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Masterpiece</h2>
            <p className="text-muted-foreground mb-4">
              Upload your document that needs citations
            </p>
            
            {!masterpiece ? (
              <FileUpload 
                onFileAccepted={handleMasterpieceUpload} 
                type="masterpiece" 
                multiple={false}
              />
            ) : (
              <div className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium truncate">{masterpiece.file.name}</p>
                  <button 
                    className="text-destructive hover:text-destructive/80"
                    onClick={() => removePDF(masterpiece.id)}
                    disabled={isProcessing}
                  >
                    Remove
                  </button>
                </div>
                <ProgressBar 
                  progress={masterpiece.progress} 
                  status={masterpiece.status} 
                  label={masterpiece.status === 'processing' ? 'Processing...' : masterpiece.status === 'processed' ? 'Ready' : 'Pending'}
                />
              </div>
            )}
          </div>
          
          {/* Reference Uploads */}
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Reference Documents</h2>
            <p className="text-muted-foreground mb-4">
              Upload PDFs to cite from (papers, books, etc.)
            </p>
            
            <div className="space-y-4">
              {references.map(ref => (
                <div key={ref.id} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium truncate">{ref.file.name}</p>
                    <button 
                      className="text-destructive hover:text-destructive/80"
                      onClick={() => removePDF(ref.id)}
                      disabled={isProcessing}
                    >
                      Remove
                    </button>
                  </div>
                  <ProgressBar 
                    progress={ref.progress} 
                    status={ref.status} 
                    label={ref.status === 'processing' ? 'Processing...' : ref.status === 'processed' ? 'Ready' : 'Pending'}
                  />
                </div>
              ))}
              
              <FileUpload 
                onFileAccepted={handleReferenceUpload} 
                type="reference" 
                multiple={true}
              />
            </div>
          </div>
          
          {/* Next Step Button */}
          <div className="col-span-1 lg:col-span-2 mt-6 flex justify-center">
            <button
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
              disabled={!masterpiece || references.length === 0 || isProcessing || uploadedPDFs.some(pdf => pdf.status === 'pending' || pdf.status === 'processing')}
              onClick={goToCompareStep}
            >
              Continue to Text Comparison
            </button>
          </div>
        </div>
      )}
      
      {/* Compare Step (placeholder) */}
      {activeStep === 'compare' && (
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Text Comparison</h2>
          <p className="text-muted-foreground">
            This feature is under development. In this step, we'll compare your document against the references.
          </p>
        </div>
      )}
      
      {/* Cite Step (placeholder) */}
      {activeStep === 'cite' && (
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Citation Generation</h2>
          <p className="text-muted-foreground">
            This feature is under development. In this step, we'll generate formatted citations.
          </p>
        </div>
      )}
    </div>
  );
} 