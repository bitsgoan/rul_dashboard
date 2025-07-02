import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { ChartDataPoint } from "@/data/chartData";

interface LineChartProps {
  data: ChartDataPoint[];
  color?: string;
  strokeWidth?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  units?: string;
  yAxisPrecision?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  color = "#3b82f6",
  strokeWidth = 2,
  xAxisLabel = "X Axis",
  yAxisLabel = "Y Axis",
  units = "",
  yAxisPrecision = 2,
}) => {
  const formatNumber = (value: number) => {
    if (yAxisPrecision === 4) {
      return value.toFixed(4);
    }
    return value.toFixed(2);
  };
  
  // Format x-axis values with 5 decimal places for Nyquist plot
  const formatXValue = (value: number) => {
    // If this is a Nyquist plot (checking for Z_real in xAxisLabel)
    if (xAxisLabel.includes('Z_real')) {
      return value.toFixed(5);
    }
    return value.toFixed(2);
  };

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 30, left: 50, bottom: 50 }}
        >
          <XAxis
            dataKey="x"
            axisLine={true}
            tickLine={true}
            tick={{ fontSize: 20, fontWeight: 600 }}
            tickFormatter={(value) => formatXValue(Number(value))}
            label={{
              value: xAxisLabel,
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
            axisLine={true}
            tickLine={true}
            tick={{ fontSize: 20, fontWeight: 600 }}
            tickFormatter={formatNumber}
            label={{
              value: yAxisLabel,
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
          <Line
            type="monotone"
            dataKey="y"
            stroke={color}
            strokeWidth={4}
            dot={{ r: 2 }}
            activeDot={{ r: 8 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>

      {units && (
        <div className="absolute top-2 right-2 bg-white border border-gray-300 px-3 py-2 rounded text-base font-bold shadow-sm">
          {units}
        </div>
      )}
    </div>
  );
};

export default LineChart;
