import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LineChart from "@/components/LineChart";
import LoadingProgress from "@/components/LoadingProgress";
import CurrentVoltageChart from "@/components/CurrentVoltageChart";
import CombinedBodeChart from "@/components/CombinedBodeChart";
import LargeMetric from "@/components/LargeMetric";

import {
  nyquistData,
  bodeMagnitudeData,
  bodePhaseData,
  currentVoltageData,
  resultsData,
} from "@/data/chartData";

type Screen = "start" | "analysis" | "results";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("start");
  const [showCheckResults, setShowCheckResults] = useState(false);

  const handleStart = () => {
    setCurrentScreen("analysis");
  };

  const handleChartComplete = () => {
    setShowCheckResults(true);
  };

  const handleCheckResults = () => {
    setCurrentScreen("results");
  };

  const handleBackToStart = () => {
    setCurrentScreen("start");
    setShowCheckResults(false);
  };

  const renderStartScreen = () => (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col">
      <div className="flex items-center justify-center mb-12">
        <img
          src="/assets/lohum.jpg"
          alt="LOHUM Logo"
          className="h-32 w-auto object-contain"
        />
      </div>

      <div
        className="flex-1 flex flex-col items-center justify-center"
        style={{ marginTop: "-8rem" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Real time cell capacity estimation
          </h1>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="w-80 text-lg text-gray-600 text-center">
            Press on the analyse button to start cell capacity estimation.
          </div>
          <Button
            onClick={handleStart}
            className="bg-green-400 hover:bg-green-500 text-white rounded-full w-32 h-32 text-xl font-medium"
          >
            Analyse
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAnalysisScreen = () => (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col">
      <div className="flex items-center justify-center mb-8">
        <img
          src="/assets/lohum.jpg"
          alt="LOHUM Logo"
          className="h-32 w-auto object-contain"
        />
      </div>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <LoadingProgress onComplete={() => {}} />
        </div>

        <div className="bg-white border border-gray-400 rounded-lg p-6 flex-1 mb-6" style={{ minHeight: '500px' }}>
          <h1 className="text-2xl font-bold mb-4 text-center">Battery Analysis in Progress</h1>
          <CurrentVoltageChart onComplete={handleChartComplete} />
        </div>

        {showCheckResults && (
          <div className="flex justify-center pb-4">
            <Button
              onClick={handleCheckResults}
              className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold px-8 py-4 rounded-lg"
            >
              Check Results
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderResultsScreen = () => (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col">
      <div className="flex items-center justify-center mb-8">
        <img
          src="/assets/lohum.jpg"
          alt="LOHUM Logo"
          className="h-32 w-auto object-contain"
        />
      </div>

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-8 mb-6">
          <Button
            onClick={handleBackToStart}
            variant="outline"
            className="flex items-center gap-2 text-lg px-6 py-3"
          >
            <ArrowLeft size={24} />
            Back to Start
          </Button>
          <h2 className="text-3xl font-semibold text-gray-800">Results</h2>
        </div>

        <div className="bg-white border border-gray-400 rounded-lg p-6 flex-1">
          {/* Large metrics row at the top of the box */}
          <div className="flex justify-center items-center mb-8 py-6 border-b border-gray-300">
            <div className="flex flex-wrap items-center justify-center gap-12">
              <LargeMetric
                label="SoH:"
                value={`${resultsData.SoH.toFixed(2)}%`}
                color="#22c55e"
                size="large"
              />
              <LargeMetric
                label="RUL:"
                value={resultsData.RUL}
                color="#3b82f6"
                size="large"
              />
              <LargeMetric
                label="OCV:"
                value={`${resultsData.OCV}V`}
                color="#a855f7"
                size="large"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 h-full">
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex flex-col">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
                Nyquist Plot
              </h3>
              <div
                className="flex-1"
                style={{
                  aspectRatio: "1",
                  minHeight: "240px",
                  maxHeight: "320px",
                }}
              >
                <LineChart
                  data={nyquistData}
                  color="#3b82f6"
                  xAxisLabel="Z_real (Ω)"
                  yAxisLabel="-Z_img (Ω)"
                  units="Ω"
                  yAxisPrecision={4}
                />
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex flex-col">
              <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
                Bode Plot
              </h3>
              <div
                className="flex-1"
                style={{
                  aspectRatio: "1",
                  minHeight: "240px",
                  maxHeight: "320px",
                }}
              >
                <CombinedBodeChart
                  magnitudeData={bodeMagnitudeData}
                  phaseData={bodePhaseData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  switch (currentScreen) {
    case "start":
      return renderStartScreen();
    case "analysis":
      return renderAnalysisScreen();
    case "results":
      return renderResultsScreen();
    default:
      return renderStartScreen();
  }
};

export default Index;
