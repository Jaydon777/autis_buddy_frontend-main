import React from "react";
import Link from "next/link";
import { FaBrain, FaMusic, FaVideo, FaArrowRight, FaWaveSquare } from "react-icons/fa";

export default function HowTo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-blue-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Autis Buddy Works
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Understanding our approach to creating personalized calm for autistic children
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Project Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
            <p className="text-gray-700 mb-4">
              Autistic children often experience uncontrollable emotions and heightened hyperactivity, 
              which can disrupt their ability to relax and get adequate sleep. Lack of sleep further 
              exacerbates behavioral and emotional challenges, creating a cycle that is difficult to break.
            </p>
            <p className="text-gray-700 mb-4">
              To address this issue, we&apos;ve developed a machine learning (ML) model that analyzes the brain 
              waves (EEG data) of autistic children. By extracting meaningful parameters from the EEG signals, 
              the system generates personalized, calming content to help the child transition from a 
              hyperactive state to a calm, restful one.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">The personalized content includes:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-5 rounded-lg flex items-start">
                <div className="mr-4 mt-1 text-blue-600">
                  <FaMusic size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-gray-900 mb-2">Custom Soothing Music</h4>
                  <p className="text-gray-700">
                    Generated dynamically based on EEG-derived parameters, with specific musical notes 
                    or chords (e.g., A-sharp, C-sharp) tailored to the child&apos;s current brain state.
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg flex items-start">
                <div className="mr-4 mt-1 text-blue-600">
                  <FaVideo size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-gray-900 mb-2">Accompanying Calming Videos</h4>
                  <p className="text-gray-700">
                    Stock footage of serene environments such as rain, flowing water, or nature scenes 
                    designed to visually complement the music and create an overall calming experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Process</h2>
          <div className="space-y-8">
            {/* Step 1: EEG Data Analysis */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">1</div>
                <h3 className="text-xl font-semibold text-gray-900">EEG Data Analysis</h3>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-4">
                  We collect EEG signals from the child using a wearable EEG device and analyze 
                  the signals to infer key parameters related to brain activity, such as:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Relaxation levels (e.g., alpha and theta wave dominance)</li>
                  <li>Stress or hyperactivity indicators (e.g., beta wave spikes)</li>
                  <li>Arousal states (e.g., imbalances in gamma or frontal alpha waves)</li>
                </ul>
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row items-center">
                  <div className="text-blue-600 mb-4 sm:mb-0 sm:mr-6">
                    <FaWaveSquare size={48} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Global Music Parameters</h4>
                    <p className="text-gray-700 text-sm">
                      We calculate averages for each type of brainwave to determine the overall state:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mt-3 text-sm">
                      <div className="bg-blue-50 p-2 rounded">avg_alpha</div>
                      <div className="bg-green-50 p-2 rounded">avg_gamma</div>
                      <div className="bg-purple-50 p-2 rounded">avg_beta</div>
                      <div className="bg-yellow-50 p-2 rounded">avg_delta</div>
                      <div className="bg-red-50 p-2 rounded">avg_theta</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Parameter Mapping */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">2</div>
                <h3 className="text-xl font-semibold text-gray-900">Parameter Mapping to Music Generation</h3>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-4">
                  We use the EEG parameters to determine the emotional and activity state of the child, 
                  then generate music based on their specific needs:
                </p>
                
                <div className="space-y-6 mt-6">
                  {/* Tempo Parameter */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Tempo</h4>
                    <div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm overflow-x-auto">
                      Tempo = 80 - 20 * (avg_beta + avg_gamma) / (avg_alpha + avg_theta + avg_delta + 0.01)
                    </div>
                    <p className="text-gray-700 text-sm">
                      Range: 60–80 beats per minute (bpm). Higher arousal lowers the tempo to slow the music 
                      and counteract hyperactivity, while a relaxed profile keeps it closer to 80 bpm for 
                      gentle engagement.
                    </p>
                  </div>

                  {/* Key Selection */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Key Selection</h4>
                    <div className="bg-gray-100 p-3 rounded mb-3 text-sm">
                      Choose based on the highest average wave strength:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>if avg_delta &gt; others: A minor</li>
                        <li>if avg_theta &gt; others: C major</li>
                        <li>if avg_alpha &gt; others: G major</li>
                        <li>if avg_beta or avg_gamma &gt; others: A minor</li>
                      </ul>
                    </div>
                    <p className="text-gray-700 text-sm">
                      The dominant wave reflects the child&apos;s baseline state, personalizing the key to their 
                      typical brain activity. Different keys evoke different emotional responses to match or 
                      counteract the child&apos;s state.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Per-Interval Note Parameters */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">3</div>
                <h3 className="text-xl font-semibold text-gray-900">Per-Interval Note Parameters</h3>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-4">
                  These adjust MIDI notes for each EEG interval based on specific wave strengths, 
                  ensuring dynamic adaptation:
                </p>
                
                <div className="space-y-6 mt-6">
                  {/* Pitch */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Pitch (MIDI Note Number)</h4>
                    <div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm overflow-x-auto">
                      pitch[i] = 40 + 40 * [(alpha[i] + theta[i] + 0.5 * delta[i]) - (beta[i] + gamma[i])] / 100
                    </div>
                    <p className="text-gray-700 text-sm">
                      Range: 40–80 (C2 to G5). Alpha and theta drive pitch upward as they indicate calm states; 
                      arousal waves lower pitch during hyperactivity, promoting relaxation with deeper tones.
                    </p>
                  </div>

                  {/* Step */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Step (Interval Between Notes)</h4>
                    <div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm overflow-x-auto">
                      step[i] = 1 + 4 * (1 - (beta[i] + gamma[i]) / (alpha[i] + theta[i] + delta[i] + 0.01))
                    </div>
                    <p className="text-gray-700 text-sm">
                      Range: 1–5 semitones. High arousal reduces the step size for stability and simplicity, 
                      while low arousal allows larger, flowing intervals.
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Duration (Note Length)</h4>
                    <div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm overflow-x-auto">
                      duration[i] = 0.5 + 1.5 * (alpha[i] + theta[i] + delta[i]) / (beta[i] + gamma[i] + 0.01)
                    </div>
                    <p className="text-gray-700 text-sm">
                      Range: 0.5–2.0 seconds. Higher relaxation waves lengthen notes, slowing the music to calm the child, 
                      while high arousal shortens durations.
                    </p>
                  </div>

                  {/* Velocity */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Velocity (MIDI Volume)</h4>
                    <div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm overflow-x-auto">
                      velocity[i] = 40 + 40 * (max_alpha / 100)
                    </div>
                    <p className="text-gray-700 text-sm">
                      Range: 40–80. Ties velocity to the child&apos;s peak relaxation capacity (max_alpha), 
                      personalizing loudness to their strongest calm state.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Additional Adjustments */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">4</div>
                <h3 className="text-xl font-semibold text-gray-900">Additional Adjustments</h3>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-4">
                  These refinements further personalize the music based on statistical extremes and tendencies:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {/* Pitch Range Adjustment */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Pitch Range Adjustment</h4>
                    <div className="bg-gray-100 p-3 rounded mb-3 text-sm">
                      If max_beta + max_gamma &gt; 60: Shift pitch range to 30–70
                    </div>
                    <p className="text-gray-700 text-sm">
                      Detects if peak arousal exceeds 60%, indicating significant hyperactivity, and lowers the 
                      pitch range to emphasize deeper, more grounding tones.
                    </p>
                  </div>

                  {/* Melodic Contour */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Melodic Contour</h4>
                    <div className="bg-gray-100 p-3 rounded mb-3 text-sm">
                      If mode_beta or mode_gamma is highest: step[i] = -step[i] (descending)
                    </div>
                    <p className="text-gray-700 text-sm">
                      If the most frequent state is arousal, reverses step direction to create descending 
                      melodies that musically &quot;wind down&quot; arousal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Video Integration */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">5</div>
                <h3 className="text-xl font-semibold text-gray-900">Video Integration</h3>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-4">
                  Complement the personalized music with appropriate visual content:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Select from a library of calming video clips (e.g., nature scenes, slow-moving water)</li>
                  <li>Match the visual tempo and color scheme to the EEG parameters</li>
                  <li>Synchronize visual transitions with musical changes</li>
                </ul>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="aspect-video bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-500">Ocean Waves</span>
                  </div>
                  <div className="aspect-video bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-500">Forest Scenes</span>
                  </div>
                  <div className="aspect-video bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-500">Night Sky</span>
                  </div>
                  <div className="aspect-video bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600">Gentle Rain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Our Approach Works</h2>
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-5 rounded-lg">
                <h4 className="font-medium text-lg text-gray-900 mb-3">Comprehensive Wave Analysis</h4>
                <p className="text-gray-700">
                  Every formula includes all five wave types (directly or via ratios), capturing their 
                  full influence rather than reducing them to a single index.
                </p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg">
                <h4 className="font-medium text-lg text-gray-900 mb-3">Personalization</h4>
                <p className="text-gray-700">
                  Global parameters reflect the child&apos;s overall EEG profile via averages and maxima, 
                  while per-interval parameters adapt to moment-to-moment changes.
                </p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg">
                <h4 className="font-medium text-lg text-gray-900 mb-3">Therapeutic Alignment</h4>
                <p className="text-gray-700">
                  Lower pitches, smaller steps, and longer durations during high arousal align with 
                  music therapy principles to boost alpha/theta and reduce beta/gamma.
                </p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg">
                <h4 className="font-medium text-lg text-gray-900 mb-3">Statistical Integration</h4>
                <p className="text-gray-700">
                  Maxima adjust intensity, modes influence contour, and averages set the baseline, 
                  ensuring a rich, data-driven output.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Try Autis Buddy?</h2>
          <p className="text-blue-50 mb-6 max-w-2xl mx-auto">
            Upload your EEG data to generate personalized, calming content for your child
          </p>
          <Link href="/upload" className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition shadow-sm">
            Get Started <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="font-semibold text-blue-600 flex items-center">
                <FaBrain className="mr-2" /> Autis Buddy
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                Helping autistic children transition to calm and rest
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Autis Buddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
