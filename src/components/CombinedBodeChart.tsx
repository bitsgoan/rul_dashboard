import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { ChartDataPoint } from "@/data/chartData";

interface CombinedBodeChartProps {
  magnitudeData: ChartDataPoint[];
  phaseData: ChartDataPoint[];
}

const CombinedBodeChart: React.FC<CombinedBodeChartProps> = ({
  magnitudeData,
  phaseData,
}) => {
  // Combine the data for plotting
  const combinedData = magnitudeData.map((magPoint, index) => ({
    frequency: magPoint.x,
    magnitude: magPoint.y,
    phase: phaseData[index]?.y || 0,
  }));

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={combinedData}
          margin={{ top: 15, right: 25, left: 35, bottom: 35 }}
        >
          <XAxis
            dataKey="frequency"
            axisLine={true}
            tickLine={true}
            tick={{ fontSize: 20, fontWeight: 600 }}
            tickFormatter={(value) => Number(value).toFixed(2)}
            label={{
              value: "Frequency (Hz)",
              position: "insideBottom",
              offset: -15,
              style: {
                fontSize: "22px",
                fontWeight: "bold",
                textAnchor: "middle",
              },
            }}
          />
          <YAxis
            yAxisId="magnitude"
            orientation="left"
            axisLine={true}
            tickLine={true}
            tick={{ fontSize: 20, fontWeight: 600 }}
            tickFormatter={(value) => Number(value).toFixed(2)}
            label={{
              value: "Z_mag (Ω)",
              angle: -90,
              position: "insideLeft",
              offset: -35,
              style: {
                fontSize: "22px",
                fontWeight: "bold",
                textAnchor: "middle",
              },
            }}
          />
          <YAxis
            yAxisId="phase"
            orientation="right"
            axisLine={true}
            tickLine={true}
            tick={{ fontSize: 20, fontWeight: 600 }}
            tickFormatter={(value) => Number(value).toFixed(2)}
            label={{
              value: "Z_phz (°)",
              angle: 90,
              position: "insideRight",
              offset: 15,
              style: {
                fontSize: "22px",
                fontWeight: "bold",
                textAnchor: "middle",
              },
            }}
          />
          <Line
            yAxisId="magnitude"
            type="monotone"
            dataKey="magnitude"
            stroke="#ef4444"
            strokeWidth={4}
            dot={false}
            activeDot={{ r: 6 }}
            name="Magnitude (Ω)"
          />
          <Line
            yAxisId="phase"
            type="monotone"
            dataKey="phase"
            stroke="#10b981"
            strokeWidth={4}
            dot={false}
            activeDot={{ r: 6 }}
            name="Phase (°)"
          />
          <Legend
            verticalAlign="top"
            height={30}
            wrapperStyle={{ fontSize: "18px", fontWeight: "600" }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>

      <div className="absolute top-2 right-2 bg-white border border-gray-300 px-3 py-2 rounded text-base font-bold shadow-sm">
        Ω / °
      </div>
    </div>
  );
};

export default CombinedBodeChart;
