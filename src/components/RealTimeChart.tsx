import React, { useState, useEffect } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { ChartDataPoint } from "@/data/chartData";

interface RealtimeChartProps {
  initialData: ChartDataPoint[];
}

const RealtimeChart: React.FC<RealtimeChartProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData];
        const lastPoint = newData[newData.length - 1];
        const newPoint = {
          x: lastPoint.x + 1,
          y: Math.random() * 60 + 10,
        };

        if (newData.length >= 8) {
          newData.shift();
        }

        return [...newData, newPoint];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          <XAxis
            dataKey="x"
            axisLine={true}
            tickLine={true}
            tick={{ fontSize: 12 }}
          />
          <YAxis axisLine={true} tickLine={true} tick={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </RechartsLineChart>
      </ResponsiveContainer>

      <div className="absolute top-4 right-4 bg-white border border-gray-300 p-3 rounded shadow-sm">
        <p className="text-xs text-gray-600">
          This graph keeps updating every 1 second
          <br />
          - data will be static. There will be data for
          <br />8 seconds
        </p>
      </div>
    </div>
  );
};

export default RealtimeChart;
