"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Tone?: unknown;
    Magenta?: unknown;
  }
}

interface MidiPlayerProps {
  midiUrl: string;
}

export default function MidiPlayer({ midiUrl }: MidiPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Store ref value to use in cleanup function
    const currentPlayerRef = playerRef.current;
    
    // Dynamically load the required scripts if not already loaded
    const loadScripts = async () => {
      if (!window.Tone || !window.Magenta) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/combine/npm/tone@14.7.58,npm/@magenta/music@1.23.1/es6/core.js,npm/html-midi-player@1.5.0";
        script.async = true;
        document.body.appendChild(script);

        return new Promise((resolve) => {
          script.onload = () => resolve(true);
        });
      }
      return Promise.resolve(true);
    };

    loadScripts().then(() => {
      if (currentPlayerRef) {
        // Clear any existing content
        currentPlayerRef.innerHTML = "";

        // Create MIDI player element
        const midiPlayer = document.createElement("midi-player");
        midiPlayer.setAttribute("src", midiUrl);
        midiPlayer.setAttribute("sound-font", ""); // Optional: Add a SoundFont URL for better sound
        midiPlayer.setAttribute("visualizer", "#midiVisualizer");

        // Create MIDI visualizer element
        const midiVisualizer = document.createElement("midi-visualizer");
        midiVisualizer.setAttribute("type", "piano-roll");
        midiVisualizer.id = "midiVisualizer";

        // Append elements to the container
        currentPlayerRef.appendChild(midiPlayer);
        currentPlayerRef.appendChild(midiVisualizer);
      }
    });

    // Cleanup on unmount
    return () => {
      if (currentPlayerRef) {
        currentPlayerRef.innerHTML = "";
      }
    };
  }, [midiUrl]);

  return (
    <div className="w-full">
      <div ref={playerRef} className="midi-player-container" />
    </div>
  );
}