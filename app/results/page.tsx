"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaDownload,
  FaChartBar,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ProcessingStatus } from "@/app/process/page";
import MidiPlayer from "@/components/MidiPlayer";

// Helper function to ensure URLs point to the backend server
const getBackendUrl = (path: string) => {
  // If the path is already a full URL, return it as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Get the backend URL from environment variables with a fallback
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  // Otherwise, prefix with the backend server URL
  return `${backendUrl}${path.startsWith("/") ? "" : "/"}${path}`;
};

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("jobId");

  const [isLoading, setIsLoading] = useState(true);
  const [processingState, setProcessingState] =
    useState<ProcessingStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("json");

  useEffect(() => {
    if (!jobId) {
      setError("No Job ID provided. Please go back to processing page.");
      setIsLoading(false);
      return;
    }

    const fetchStatus = async () => {
      try {
        setIsLoading(true);
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

        const response = await fetch(`${backendUrl}/api/status/${jobId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.detail || "Failed to fetch processing status"
          );
        }

        const data = await response.json();

        if (data.status !== "COMPLETED") {
          router.push(`/process/${jobId}`);
          return;
        }

        setProcessingState(data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the results");
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [jobId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="inline text-blue-500 text-3xl animate-spin mb-4" />
          <p className="text-gray-700">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error || !processingState || !processingState.output_files) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="mb-6">
            <Link
              href={jobId ? `/process/${jobId}` : "/upload"}
              className="inline-flex items-center text-gray-600 hover:text-black"
            >
              <FaArrowLeft className="mr-2" />
              {jobId ? "Back to Processing" : "Back to Upload"}
            </Link>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center text-red-700 mb-2">
              <FaExclamationTriangle className="mr-2" />
              <h3 className="font-semibold">Error</h3>
            </div>
            <p className="text-red-600">{error || "Failed to load results"}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link
            href={`/process/${jobId}`}
            className="inline-flex items-center text-gray-600 hover:text-black"
          >
            <FaArrowLeft className="mr-2" />
            Back to Processing
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">EEG Analysis Results</h1>

        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Results</h2>

          {/* File Types Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`${
                activeTab === "json"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              } px-4 py-2 rounded-lg font-medium hover:bg-blue-200`}
              onClick={() => setActiveTab("json")}
            >
              JSON Files
            </button>
            <button
              className={`${
                activeTab === "midi"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              } px-4 py-2 rounded-lg font-medium hover:bg-blue-200`}
              onClick={() => setActiveTab("midi")}
            >
              MIDI Files
            </button>
            <button
              className={`${
                activeTab === "visualizations"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              } px-4 py-2 rounded-lg font-medium hover:bg-blue-200`}
              onClick={() => setActiveTab("visualizations")}
            >
              Visualizations
            </button>
          </div>

          {/* Files Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* JSON Files - Only visible when JSON tab is active */}
            {activeTab === "json" && (
              <>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Wave Analysis</h3>
                      <p className="text-sm text-gray-600">
                        Preprocessed EEG Data
                      </p>
                    </div>
                    <a
                      href={getBackendUrl(
                        processingState.output_files.preprocessed_eeg
                      )}
                      download
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaDownload />
                    </a>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Music Parameters</h3>
                      <p className="text-sm text-gray-600">
                        Generated from EEG
                      </p>
                    </div>
                    <a
                      href={getBackendUrl(
                        processingState.output_files.music_parameters
                      )}
                      download
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaDownload />
                    </a>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Global Parameters</h3>
                      <p className="text-sm text-gray-600">
                        Overall analysis results
                      </p>
                    </div>
                    <a
                      href={getBackendUrl(
                        processingState.output_files.global_parameters
                      )}
                      download
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaDownload />
                    </a>
                  </div>
                </div>
              </>
            )}

            {/* MIDI Files - Only visible when MIDI tab is active */}
            {activeTab === "midi" && (
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition col-span-1 md:col-span-2">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">MIDI File</h3>
                    <p className="text-sm text-gray-600">
                      Generated music based on EEG
                    </p>
                  </div>
                  <a
                    href={getBackendUrl(processingState.output_files.midi_file)}
                    download
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaDownload />
                  </a>
                </div>
                {/* Enhanced MIDI Player */}
                <div className="flex flex-col items-center mt-6">
                  <MidiPlayer
                    midiUrl={getBackendUrl(
                      processingState.output_files.midi_file
                    )}
                  />
                </div>
              </div>
            )}

            {/* Visualization Preview - Shown at bottom regardless of active tab */}
            {activeTab === "visualizations" && (
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition col-span-1 md:col-span-2">
                <h3 className="font-semibold mb-3">Visualizations</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <a
                    href={getBackendUrl(
                      processingState.output_files.wave_distribution_plot
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
                  >
                    <div className="text-center">
                      <FaChartBar
                        className="mx-auto text-gray-400 mb-2"
                        size={24}
                      />
                      <p className="text-xs text-gray-600">Wave Distribution</p>
                    </div>
                  </a>
                  <a
                    href={getBackendUrl(
                      processingState.output_files.wave_heatmap_plot
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
                  >
                    <div className="text-center">
                      <FaChartBar
                        className="mx-auto text-gray-400 mb-2"
                        size={24}
                      />
                      <p className="text-xs text-gray-600">Wave Heatmap</p>
                    </div>
                  </a>
                  <a
                    href={getBackendUrl(
                      processingState.output_files.music_parameters_plot
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
                  >
                    <div className="text-center">
                      <FaChartBar
                        className="mx-auto text-gray-400 mb-2"
                        size={24}
                      />
                      <p className="text-xs text-gray-600">Music Parameters</p>
                    </div>
                  </a>
                  <a
                    href={getBackendUrl(
                      processingState.output_files.global_parameters_plot
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
                  >
                    <div className="text-center">
                      <FaChartBar
                        className="mx-auto text-gray-400 mb-2"
                        size={24}
                      />
                      <p className="text-xs text-gray-600">Global Parameters</p>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResultsPage() {
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
      <ResultContent />
    </Suspense>
  );
}
