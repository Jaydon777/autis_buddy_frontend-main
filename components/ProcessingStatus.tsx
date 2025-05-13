"use client";

import { useState, useEffect } from 'react';
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useProcessing } from '@/context/ProcessingContext';

const statusMessages = {
  IDLE: 'Ready to process',
  PENDING: 'Initializing processing...',
  PROCESSING: 'Processing EEG data...',
  COMPLETED: 'Processing completed!',
  FAILED: 'Processing failed',
};

const ProcessingStatus = () => {
  const { processingState, setStatus, setProgress, setOutputFiles, setProcessingTime, setError } = useProcessing();
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // Start polling when job_id is available
  useEffect(() => {
    if (processingState.jobId && (processingState.status === 'PENDING' || processingState.status === 'PROCESSING')) {
      // Clear any existing interval
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }

      // Start new polling
      const interval = setInterval(async () => {
        try {
          const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
          const response = await fetch(`${backendUrl}/api/status/${processingState.jobId}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch status');
          }

          setStatus(data.status);
          setProgress(data.progress);

          // If completed, store output files and stop polling
          if (data.status === 'COMPLETED') {
            setOutputFiles(data.output_files);
            setProcessingTime(data.processing_time);
            clearInterval(interval);
            setPollingInterval(null);
          }

          // If failed, set error and stop polling
          if (data.status === 'FAILED') {
            setError(data.detail || 'Processing failed');
            clearInterval(interval);
            setPollingInterval(null);
          }
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : 'Error checking processing status';
          setError(errorMessage);
          clearInterval(interval);
          setPollingInterval(null);
        }
      }, 1000);

      setPollingInterval(interval);

      // Cleanup interval on unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [processingState.jobId, processingState.status, pollingInterval, setError, setOutputFiles, setProcessingTime, setProgress, setStatus]);

  // Determine which component to render based on status
  const renderStatusComponent = () => {
    switch (processingState.status) {
      case 'IDLE':
        return null;
      case 'PENDING':
      case 'PROCESSING':
        return (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <FaSpinner className="text-blue-500 text-2xl mr-3 animate-spin" />
              <h3 className="text-xl font-medium">
                {statusMessages[processingState.status]}
              </h3>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${processingState.progress}%` }}
              ></div>
            </div>
            <p className="text-gray-600">
              {processingState.progress}% complete
            </p>
          </div>
        );
      case 'COMPLETED':
        return (
          <div className="bg-green-50 border border-green-200 shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <FaCheckCircle className="text-green-500 text-2xl mr-3" />
              <h3 className="text-xl font-medium text-green-700">
                {statusMessages[processingState.status]}
              </h3>
            </div>
            <p className="text-green-600 mb-2">
              Processing completed in {processingState.processingTime?.toFixed(2)} seconds.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `100%` }}
              ></div>
            </div>
          </div>
        );
      case 'FAILED':
        return (
          <div className="bg-red-50 border border-red-200 shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <FaExclamationCircle className="text-red-500 text-2xl mr-3" />
              <h3 className="text-xl font-medium text-red-700">
                {statusMessages[processingState.status]}
              </h3>
            </div>
            <p className="text-red-600 mb-2">
              {processingState.error || 'An error occurred during processing.'}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStatusComponent()}
    </div>
  );
};

export default ProcessingStatus;
