"use client";

import { useState, useEffect, Suspense } from "react";
import {
  FaArrowLeft,
  FaSpinner,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export interface ProcessingStatus {
  job_id: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  progress: number;
  output_files?: {
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
  processing_time?: number;
  error?: string;
}

function ProcessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job_id");

  const [isInitializing, setIsInitializing] = useState(true);
  const [processingState, setProcessingState] = useState<ProcessingStatus>({
    job_id: jobId || "",
    status: "PENDING",
    progress: 0,
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
        const response = await fetch(`${backendUrl}/api/status/${jobId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.detail || "Failed to fetch processing status"
          );
        }
        console.log("response", response);
        const data = await response.json();
        setProcessingState(data);

        // Stop initializing once we get first successful response
        if (isInitializing) {
          setIsInitializing(false);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the status");
        setIsInitializing(false);
      }
    };

    // Initial fetch
    fetchStatus();

    // Start the polling if initial fetch succeeds
    const intervalId = setInterval(() => {
      fetchStatus();
    }, 1000); // Poll every second

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [jobId, isInitializing]);

  // For the progress bar coloring based on status
  const getProgressBarColor = () => {
    switch (processingState.status) {
      case "COMPLETED":
        return "bg-green-500";
      case "FAILED":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  // For the status icon
  const getStatusIcon = () => {
    switch (processingState.status) {
      case "COMPLETED":
        return <FaCheck className="text-green-500" />;
      case "FAILED":
        return <FaExclamationTriangle className="text-red-500" />;
      case "PROCESSING":
        return <FaSpinner className="text-blue-500 animate-spin" />;
      default:
        return <FaSpinner className="text-gray-500 animate-spin" />;
    }
  };

  // For the status text
  const getStatusText = () => {
    switch (processingState.status) {
      case "PENDING":
        return "Initializing processing...";
      case "PROCESSING":
        return `Processing EEG data (${processingState.progress}%)`;
      case "COMPLETED":
        return `Processing completed in ${
          processingState.processing_time?.toFixed(1) || 0
        } seconds`;
      case "FAILED":
        return "Processing failed";
      default:
        return "Unknown status";
    }
  };

  const viewResults = () => {
    router.push(`/results?jobId=${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link
            href="/upload"
            className="inline-flex items-center text-gray-600 hover:text-black"
          >
            <FaArrowLeft className="mr-2" />
            Back to Upload
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Processing EEG Data</h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center text-red-700 mb-1">
              <FaExclamationTriangle className="mr-2" />
              <h3 className="font-semibold">Error</h3>
            </div>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {isInitializing ? (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-center">
            <FaSpinner className="inline text-blue-500 text-2xl animate-spin mb-2" />
            <p className="text-gray-700">Initializing processing...</p>
          </div>
        ) : (
          <>
            {/* Processing Status Card */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center mr-3">
                  {getStatusIcon()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {processingState.status}
                  </h2>
                  <p className="text-gray-600">{getStatusText()}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                <div
                  className={`${getProgressBarColor()} h-4 rounded-full transition-all duration-300`}
                  style={{ width: `${processingState.progress}%` }}
                ></div>
              </div>

              {/* Job ID */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Job ID: <span className="font-mono">{jobId}</span>
                </p>
              </div>

              {/* View Results Button - Only show when processing is complete */}
              {processingState.status === "COMPLETED" && (
                <div className="mt-6 text-center">
                  <button
                    onClick={viewResults}
                    className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-md transition-colors shadow-md"
                  >
                    View Results
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function ProcessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="inline text-blue-500 text-3xl animate-spin mb-4" />
            <p className="text-gray-700">Loading page...</p>
          </div>
        </div>
      }
    >
      <ProcessContent />
    </Suspense>
  );
}
