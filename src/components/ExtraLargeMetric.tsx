import React, { useEffect, useRef, useState } from "react";

interface ExtraLargeMetricProps {
  label: string;
  value: string | number;
  color: string;
  fontSize?: string;
}

const ExtraLargeMetric: React.FC<ExtraLargeMetricProps> = ({
  label,
  value,
  color,
  fontSize = "18rem", // Default to 18rem (288px)
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  
  // Add debugging to check what's being rendered
  console.log(`Rendering ExtraLargeMetric: ${label} = ${value}, fontSize: ${fontSize}`);

  // Use effect to adjust font size if needed
  useEffect(() => {
    // Force a repaint to ensure proper rendering
    setTimeout(() => {
      if (valueRef.current) {
        console.log(`${label} element width: ${valueRef.current.offsetWidth}px, height: ${valueRef.current.offsetHeight}px`);
      }
    }, 100);
  }, [label, value, fontSize]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center" 
      style={{ 
        margin: "0 1rem",
        maxWidth: "33%",
        flexShrink: 1,
        flexGrow: 1,
      }}
    >
      <div className="text-4xl font-medium text-gray-600 mb-2">{label}</div>
      <div
        ref={valueRef}
        style={{
          fontSize,
          fontWeight: 900,
          lineHeight: "0.9",
          color,
          display: "block",
          textAlign: "center",
          width: "100%",
          overflow: "visible",
          textShadow: "0 4px 8px rgba(0,0,0,0.15)",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
          transform: "scale(0.9)", // Slightly scale down to fit better
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default ExtraLargeMetric;
