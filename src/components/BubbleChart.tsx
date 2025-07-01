import React from "react";
import { BubbleDataPoint } from "@/data/chartData";

interface BubbleChartProps {
  data: BubbleDataPoint[];
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-4 p-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="relative flex items-center justify-center border-2 border-gray-400 rounded-full bg-white"
          style={{
            width: `${item.size}px`,
            height: `${item.size}px`,
          }}
        >
          <span className="text-xs font-medium text-gray-700">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default BubbleChart;
