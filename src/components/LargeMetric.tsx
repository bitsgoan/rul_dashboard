import React, { useEffect, useRef } from "react";

// ===== CHANGE THIS VALUE TO ADJUST ALL METRIC SIZES =====
// This is the single location to control font size
const METRIC_SIZE_MULTIPLIER = 1.0; // 1.0 = default, 2.0 = twice as large, 0.5 = half size
// =====================================================

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
  size = "xlarge",
  inline = false,
}) => {
  const valueRef = useRef<HTMLDivElement>(null);

  // Base font sizes - these will be multiplied by METRIC_SIZE_MULTIPLIER
  const baseFontSizes = {
    medium: { label: "24px", value: "32px" },
    large: { label: "28px", value: "40px" },
    xlarge: { label: "32px", value: "48px" },
    xxlarge: { label: "36px", value: "56px" },
  };

  // Calculate actual font sizes based on multiplier
  const getFontSize = (size: string) => {
    const numericSize = parseInt(size);
    return `${Math.round(numericSize * METRIC_SIZE_MULTIPLIER)}px`;
  };

  const labelSize = getFontSize(baseFontSizes[size].label);
  const valueSize = getFontSize(baseFontSizes[size].value);

  // Use effect to inject custom CSS that overrides global styles
  useEffect(() => {
    // Create a unique ID for this instance
    const uniqueId = `metric-${Math.random().toString(36).substring(2, 9)}`;

    // Add a unique class to the value element
    if (valueRef.current) {
      valueRef.current.classList.add(uniqueId);
    }

    // Create a style element with !important rules
    const style = document.createElement("style");
    style.innerHTML = `
      .${uniqueId} {
        font-size: ${valueSize} !important;
        font-weight: 900 !important;
        line-height: 0.9 !important;
        color: ${color} !important;
        display: block !important;
        text-align: center !important;
        width: 100% !important;
        overflow: visible !important;
        text-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
        letter-spacing: -0.02em !important;
        white-space: nowrap !important;
      }
    `;
    document.head.appendChild(style);

    // Log the actual size after rendering
    setTimeout(() => {
      if (valueRef.current) {
        console.log(
          `${label} element width: ${valueRef.current.offsetWidth}px, height: ${valueRef.current.offsetHeight}px`
        );
        console.log(
          `Applied styles with class: ${uniqueId}, font size: ${valueSize}`
        );
      }
    }, 100);

    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, [label, value, valueSize, color]);

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
        <div
          ref={valueRef}
          // Styles will be applied via dynamic CSS
        >
          {value}
        </div>
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
        ref={valueRef}
        // Styles will be applied via dynamic CSS
      >
        {value}
      </div>
    </div>
  );
};

export default LargeMetric;
