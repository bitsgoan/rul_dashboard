import React, { useState, useEffect } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartDataPoint, currentVoltageData } from "@/data/chartData";

interface CurrentVoltageChartProps {
  onComplete: () => void;
}

const CurrentVoltageChart: React.FC<CurrentVoltageChartProps> = ({
  onComplete,
}) => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  // Set chart height on mount
  useEffect(() => {
    // Set a fixed height for the chart container
    setChartHeight(400);

    // Initialize with some data points immediately
    const initialPoints = 30;
    const initialData: ChartDataPoint[] = [];

    for (
      let i = 0;
      i < initialPoints && i < currentVoltageData.current.length;
      i++
    ) {
      initialData.push({
        x: currentVoltageData.voltage[i],
        y: currentVoltageData.current[i],
      });
    }

    setData(initialData);
    setCurrentIndex(initialPoints);
  }, []);

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

  console.log("Chart data points:", data.length);
  console.log("Current index:", currentIndex);
  console.log("Voltage range:", voltageMin, voltageMax);
  console.log("Current range:", currentMin, currentMax);

  // If no data, show a loading message
  if (data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">
          Loading chart data...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: `${chartHeight}px` }}>
      <h2 className="text-3xl font-bold mb-4 text-center">
        Current vs Voltage Analysis
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey="x"
            type="number"
            domain={[voltageMin - voltagePadding, voltageMax + voltagePadding]}
            axisLine={true}
            tickLine={true}
            tick={{ fontSize: 20, fontWeight: 500 }}
            tickFormatter={(value) => Number(value).toFixed(2)}
            label={{
              value: "Voltage (V)",
              position: "insideBottom",
              offset: -25,
              style: {
                fontSize: "22px",
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
            tick={{ fontSize: 20, fontWeight: 500 }}
            tickFormatter={(value) => Number(value).toFixed(2)}
            label={{
              value: "Current (A)",
              angle: -90,
              position: "insideLeft",
              offset: -45,
              style: {
                fontSize: "22px",
                fontWeight: "bold",
                textAnchor: "middle",
              },
            }}
          />
          <Tooltip
            formatter={(value) => [Number(value).toFixed(3), "Current (A)"]}
            labelFormatter={(label) => `Voltage: ${Number(label).toFixed(3)} V`}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "18px",
              padding: "10px",
            }}
          />
          <Legend
            verticalAlign="top"
            height={40}
            wrapperStyle={{
              fontSize: "20px",
              fontWeight: 500,
              paddingTop: "10px",
            }}
          />
          <Line
            name="Current vs Voltage"
            type="monotone"
            dataKey="y"
            stroke="#2563eb"
            strokeWidth={4}
            dot={{ r: 2 }}
            activeDot={{ r: 8 }}
            isAnimationActive={true}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrentVoltageChart;
