import React from "react";

interface LargeMetricProps {
  label: string;
  value: string | number;
  color: string;
  size?: "medium" | "large" | "xlarge" | "xxlarge";
  inline?: boolean;
}

const LargeMetric: React.FC<LargeMetricProps> = ({
  label,
  value,
  color,
  size = "xxlarge",
  inline = false,
}) => {
  // Font size mapping based on size prop with more dramatic differences
  const fontSizes = {
    medium: { label: "16px", value: "32px" },
    large: { label: "18px", value: "48px" },
    xlarge: { label: "24px", value: "64px" },
    xxlarge: { label: "32px", value: "128px" },
  };
  
  // Add console log for debugging
  console.log(`Rendering LargeMetric with size=${size}, fontSize=${fontSizes[size].value}`);

  // Get font sizes based on selected size
  const { label: labelSize, value: valueSize } = fontSizes[size];

  if (inline) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            fontSize: labelSize,
            fontWeight: 500,
            color: "#4B5563",
            marginRight: "8px",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: valueSize,
            fontWeight: 900,
            color: color,
            lineHeight: 1,
            display: "inline-block", // Ensure proper rendering
            textShadow: size === "xxlarge" ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
          }}
        >
          {value}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 20px",
      }}
    >
      <div
        style={{
          fontSize: labelSize,
          fontWeight: 500,
          color: "#4B5563",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: valueSize,
          fontWeight: 700,
          color: color,
          lineHeight: "0.9",
          textAlign: "center",
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default LargeMetric;
