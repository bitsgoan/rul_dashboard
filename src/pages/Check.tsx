import React from "react";
import ExtraLargeMetric from "@/components/ExtraLargeMetric";

const Check: React.FC = () => {
  // Sample data for testing
  const sampleData = {
    SoH: 83.79,
    RUL: 552,
    OCV: 4.09,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-8">
        <h1 className="text-3xl font-bold mb-8">Metrics Test Page</h1>
        
        <div className="bg-white border border-gray-400 rounded-lg p-6 flex-1">
          {/* Extra large metrics row */}
          <div className="flex justify-center items-center py-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <ExtraLargeMetric
                label="SoH:"
                value={`${sampleData.SoH.toFixed(2)}%`}
                color="#22c55e"
                fontSize="24rem"
              />
              <ExtraLargeMetric
                label="RUL:"
                value={sampleData.RUL}
                color="#3b82f6"
                fontSize="24rem"
              />
              <ExtraLargeMetric
                label="OCV:"
                value={`${sampleData.OCV}V`}
                color="#a855f7"
                fontSize="24rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Check;