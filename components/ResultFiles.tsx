"use client";

import { useProcessing } from "@/context/ProcessingContext";
import { FaFileAlt, FaFileImage, FaMusic, FaChartBar } from "react-icons/fa";

const fileTypeIcons = {
  json: <FaFileAlt className="text-blue-500" />,
  png: <FaFileImage className="text-green-500" />,
  mid: <FaMusic className="text-purple-500" />,
  csv: <FaChartBar className="text-orange-500" />,
};

const FileItem = ({ title, path }: { title: string; path: string }) => {
  const fileType = path.split(".").pop() || "";
  const icon =
    fileType in fileTypeIcons ? (
      fileTypeIcons[fileType as keyof typeof fileTypeIcons]
    ) : (
      <FaFileAlt className="text-gray-500" />
    );

  return (
    <div className="flex items-center p-3 bg-gray-50 rounded-md mb-2 hover:bg-gray-100 transition-colors">
      <div className="mr-3 text-xl">{icon}</div>
      <div className="flex-grow">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500 truncate">{path}</p>
      </div>
      <a
        href={`${path}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Download
      </a>
    </div>
  );
};

const ResultFiles = () => {
  const { processingState } = useProcessing();
  const { outputFiles } = processingState;

  if (!outputFiles) return null;

  const fileGroups = [
    {
      title: "EEG Analysis",
      files: [
        { name: "Preprocessed EEG Data", path: outputFiles.preprocessed_eeg },
        { name: "Wave Distribution", path: outputFiles.wave_distribution_plot },
        { name: "Wave Heatmap", path: outputFiles.wave_heatmap_plot },
      ],
    },
    {
      title: "Music Generation",
      files: [
        { name: "Music Parameters", path: outputFiles.music_parameters },
        {
          name: "Music Parameters Plot",
          path: outputFiles.music_parameters_plot,
        },
        { name: "MIDI File", path: outputFiles.midi_file },
        { name: "MIDI Visualization", path: outputFiles.midi_visualization },
      ],
    },
    {
      title: "Global Analysis",
      files: [
        { name: "Global Parameters", path: outputFiles.global_parameters },
        {
          name: "Global Parameters Plot",
          path: outputFiles.global_parameters_plot,
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">Output Files</h3>

      <div className="space-y-6">
        {fileGroups.map((group, index) => (
          <div key={index} className="border-t pt-4 first:border-0 first:pt-0">
            <h4 className="text-lg font-medium mb-3">{group.title}</h4>
            <div>
              {group.files.map((file, fileIndex) => (
                <FileItem key={fileIndex} title={file.name} path={file.path} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultFiles;
