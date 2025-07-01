import React, { useEffect, useRef } from "react";

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

  // Use effect to inject custom CSS that overrides global styles
  useEffect(() => {
    // Create a unique ID for this instance
    const uniqueId = `metric-${Math.random().toString(36).substring(2, 9)}`;
    
    // Add a unique class to the value element
    if (valueRef.current) {
      valueRef.current.classList.add(uniqueId);
    }
    
    // Create a style element with !important rules
    const style = document.createElement('style');
    style.innerHTML = `
      .${uniqueId} {
        font-size: ${fontSize} !important;
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
        console.log(`${label} element width: ${valueRef.current.offsetWidth}px, height: ${valueRef.current.offsetHeight}px`);
        console.log(`Applied styles with class: ${uniqueId}`);
      }
    }, 100);
    
    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, [label, value, fontSize, color]);

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
        // We'll apply styles via the dynamic CSS class
      >
        {value}
      </div>
    </div>
  );
};

export default ExtraLargeMetric;
