"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type OutputFiles = {
  preprocessed_eeg: string;
  music_parameters: string;
  global_parameters: string;
  midi_file: string;
  midi_visualization: string;
  wave_distribution_plot: string;
  wave_heatmap_plot: string;
  music_parameters_plot: string;
  global_parameters_plot: string;
};

export type ProcessingState = {
  fileId: string | null;
  jobId: string | null;
  status: 'IDLE' | 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress: number;
  error: string | null;
  outputFiles: OutputFiles | null;
  processingTime: number | null;
};

type ProcessingContextType = {
  processingState: ProcessingState;
  setFileId: (fileId: string) => void;
  setJobId: (jobId: string) => void;
  setStatus: (status: ProcessingState['status']) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  setOutputFiles: (outputFiles: OutputFiles | null) => void;
  setProcessingTime: (time: number | null) => void;
  resetProcessingState: () => void;
};

const initialState: ProcessingState = {
  fileId: null,
  jobId: null,
  status: 'IDLE',
  progress: 0,
  error: null,
  outputFiles: null,
  processingTime: null,
};

const ProcessingContext = createContext<ProcessingContextType | undefined>(undefined);

export const ProcessingProvider = ({ children }: { children: ReactNode }) => {
  const [processingState, setProcessingState] = useState<ProcessingState>(initialState);

  const setFileId = (fileId: string) => {
    setProcessingState(prev => ({ ...prev, fileId }));
  };

  const setJobId = (jobId: string) => {
    setProcessingState(prev => ({ ...prev, jobId }));
  };

  const setStatus = (status: ProcessingState['status']) => {
    setProcessingState(prev => ({ ...prev, status }));
  };

  const setProgress = (progress: number) => {
    setProcessingState(prev => ({ ...prev, progress }));
  };

  const setError = (error: string | null) => {
    setProcessingState(prev => ({ ...prev, error }));
  };

  const setOutputFiles = (outputFiles: OutputFiles | null) => {
    setProcessingState(prev => ({ ...prev, outputFiles }));
  };

  const setProcessingTime = (time: number | null) => {
    setProcessingState(prev => ({ ...prev, processingTime: time }));
  };

  const resetProcessingState = () => {
    setProcessingState(initialState);
  };

  return (
    <ProcessingContext.Provider
      value={{
        processingState,
        setFileId,
        setJobId,
        setStatus,
        setProgress,
        setError,
        setOutputFiles,
        setProcessingTime,
        resetProcessingState,
      }}
    >
      {children}
    </ProcessingContext.Provider>
  );
};

export const useProcessing = () => {
  const context = useContext(ProcessingContext);
  if (context === undefined) {
    throw new Error('useProcessing must be used within a ProcessingProvider');
  }
  return context;
};
