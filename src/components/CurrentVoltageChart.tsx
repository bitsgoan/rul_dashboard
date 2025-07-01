import React, { useState, useEffect } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { ChartDataPoint } from "@/data/chartData";
import { currentVoltageData } from "@/data/chartData";

interface CurrentVoltageChartProps {
  onComplete: () => void;
}

const CurrentVoltageChart: React.FC<CurrentVoltageChartProps> = ({
  onComplete,
}) => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= currentVoltageData.current.length) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      // Add 15 data points per second (every ~67ms per point)
      const pointsToAdd = Math.min(
        15,
        currentVoltageData.current.length - currentIndex
      );

      const newPoints: ChartDataPoint[] = [];
      for (let i = 0; i < pointsToAdd; i++) {
        if (currentIndex + i < currentVoltageData.current.length) {
          newPoints.push({
            x: currentVoltageData.voltage[currentIndex + i],
            y: currentVoltageData.current[currentIndex + i],
          });
        }
      }

      setData((prevData) => [...prevData, ...newPoints]);
      setCurrentIndex((prev) => prev + pointsToAdd);
    }, 1000); // Add points every second

    return () => clearInterval(interval);
  }, [currentIndex, onComplete]);

  // Calculate fixed axis ranges from the complete dataset
  const allVoltages = currentVoltageData.voltage;
  const allCurrents = currentVoltageData.current;

  const voltageMin = Math.min(...allVoltages);
  const voltageMax = Math.max(...allVoltages);
  const currentMin = Math.min(...allCurrents);
  const currentMax = Math.max(...allCurrents);

  // Add some padding to the ranges
  const voltagePadding = (voltageMax - voltageMin) * 0.1;
  const currentPadding = (currentMax - currentMin) * 0.1;

  console.log("Chart data:", data);
  console.log("Current index:", currentIndex);
  console.log("Voltage range:", voltageMin, voltageMax);
  console.log("Current range:", currentMin, currentMax);

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 15, right: 25, left: 40, bottom: 35 }}
        >
          <XAxis
            dataKey="x"
            type="number"
            domain={[voltageMin - voltagePadding, voltageMax + voltagePadding]}
            axisLine={true}
            tickLine={true}
            tick={{ fontSize: 14, fontWeight: 500 }}
            tickFormatter={(value) => Number(value).toFixed(2)}
            label={{
              value: "Voltage (V)",
              position: "insideBottom",
              offset: -20,
              style: {
                fontSize: "16px",
                fontWeight: "bold",
                textAnchor: "middle",
              },
            }}
          />
          <YAxis
            type="number"
            domain={[currentMin - currentPadding, currentMax + currentPadding]}
            axisLine={true}
            tickLine={true}
            tick={{ fontSize: 14, fontWeight: 500 }}
            tickFormatter={(value) => Number(value).toFixed(2)}
            label={{
              value: "Current (A)",
              angle: -90,
              position: "insideLeft",
              style: {
                fontSize: "16px",
                fontWeight: "bold",
                textAnchor: "middle",
              },
            }}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrentVoltageChart;
