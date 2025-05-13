"use client";

import { useState, useRef } from "react";
import {
  FaUpload,
  FaCheck,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

// Define interface for upload response
interface UploadResponse {
  file_id: string;
  filename: string;
  status?: string;
}

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFileSelection(droppedFile);
  };

  const handleFileSelection = (selectedFile: File) => {
    // Check if file is .set, .edf, or .bdf
    const validExtensions = [".set", ".edf", ".bdf"];
    const fileExtension = selectedFile.name
      .substring(selectedFile.name.lastIndexOf("."))
      .toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setError(
        `Invalid file type: ${fileExtension}. Supported formats: .set, .edf, .bdf`
      );
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError(null);
    setUploadResponse(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate slower progress with smaller increments and longer intervals
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          // Smaller increments for slower progress
          return prev + Math.random() * 3 + 1;
        });
      }, 300); // Longer interval between updates

      // Artificial delay to simulate slow network
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

      const response = await fetch(`${backendUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);

      // Add a slight delay before showing 100% to make transition feel more natural
      setUploadProgress(95);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUploadProgress(100);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to upload file");
      }

      setUploadResponse(data);
      // Reset file after successful upload
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: Error | unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during upload";
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const proceed = async () => {
    if (!uploadResponse || !uploadResponse.file_id) {
      setError("Missing file ID. Please upload a file first.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

      const response = await fetch(
        `${backendUrl}/api/process/${uploadResponse.file_id}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to start processing");
      }

      // Check if we received the expected response format
      if (data.job_id && data.status) {
        console.log("Processing started with job_id:", data.job_id);
        // Navigate to the correct nested route structure
        router.push(`/process?job_id=${data.job_id}`);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err: Error | unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during processing";
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 mt-12">
        <h1 className="text-3xl font-bold text-center mb-8">Upload EEG Data</h1>

        {/* Upload Status */}
        {uploadResponse && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheck className="text-green-500 text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Upload Successful!
            </h3>
            <p className="text-green-600 mb-4">
              File &quot;{uploadResponse.filename}&quot; has been uploaded
              successfully.
            </p>
            <button
              onClick={proceed}
              className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Start Processing
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center text-red-700 mb-1">
              <FaExclamationTriangle className="mr-2" />
              <h3 className="font-semibold">Upload Failed</h3>
            </div>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Upload Area */}
        {!uploadResponse && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            } ${isUploading ? "bg-gray-50" : ""}`}
          >
            {isUploading ? (
              <div className="py-6">
                <div className="flex justify-center mb-4">
                  <FaSpinner className="text-blue-500 text-3xl animate-spin" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Uploading file...
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">
                  {uploadProgress.toPrecision(2)}% complete
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaUpload className="text-gray-400 text-2xl" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  {file ? file.name : "Drag and drop your EEG file here"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {file
                    ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                    : "Supported formats: .set, .edf, .bdf"}
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Select File
                  </button>
                  {file && (
                    <button
                      onClick={uploadFile}
                      className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Upload File
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".set,.edf,.bdf"
                    className="hidden"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Information Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Supported File Types</h3>
            <p className="text-gray-600 text-sm">
              .set, .edf, and .bdf formats for EEG data analysis
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">File Processing</h3>
            <p className="text-gray-600 text-sm">
              Your EEG data will be analyzed to create custom calming content
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Data Security</h3>
            <p className="text-gray-600 text-sm">
              All uploads are encrypted and processed securely
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
