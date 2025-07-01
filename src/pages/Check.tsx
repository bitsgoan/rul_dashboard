import React, { useEffect } from "react";
import ExtraLargeMetric from "@/components/ExtraLargeMetric";

const Check: React.FC = () => {
  // Sample data for testing
  const sampleData = {
    SoH: 83.79,
    RUL: 552,
    OCV: 4.09,
  };

  // Add custom CSS to the document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .super-large-font {
        font-size: 24rem !important;
        font-weight: 900 !important;
        line-height: 0.9 !important;
      }
      .custom-soh {
        font-size: 24rem !important;
        font-weight: 900 !important;
        color: #22c55e !important;
        display: block !important;
        text-align: center !important;
        line-height: 0.9 !important;
        letter-spacing: -0.02em !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-8">
        <h1 className="text-3xl font-bold mb-8">Metrics Test Page</h1>
        
        <div className="bg-white border border-gray-400 rounded-lg p-6 flex-1">
          {/* Method 1: Using ExtraLargeMetric component */}
          <div className="mb-16 border-b border-gray-300 pb-8">
            <h2 className="text-2xl font-bold mb-4">Method 1: Using ExtraLargeMetric Component</h2>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <ExtraLargeMetric
                label="SoH:"
                value={`${sampleData.SoH.toFixed(2)}%`}
                color="#22c55e"
                fontSize="24rem"
              />
            </div>
          </div>
          
          {/* Method 2: Using inline styles */}
          <div className="mb-16 border-b border-gray-300 pb-8">
            <h2 className="text-2xl font-bold mb-4">Method 2: Using Inline Styles</h2>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-medium text-gray-600 mb-2">SoH:</div>
              <div 
                style={{
                  fontSize: '24rem',
                  fontWeight: 900,
                  lineHeight: '0.9',
                  color: '#22c55e',
                  display: 'block',
                  textAlign: 'center',
                  letterSpacing: '-0.02em',
                }}
              >
                {`${sampleData.SoH.toFixed(2)}%`}
              </div>
            </div>
          </div>
          
          {/* Method 3: Using CSS classes */}
          <div className="mb-16 border-b border-gray-300 pb-8">
            <h2 className="text-2xl font-bold mb-4">Method 3: Using CSS Classes</h2>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-medium text-gray-600 mb-2">SoH:</div>
              <div className="super-large-font" style={{ color: '#22c55e' }}>
                {`${sampleData.SoH.toFixed(2)}%`}
              </div>
            </div>
          </div>
          
          {/* Method 4: Using custom CSS class */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Method 4: Using Custom CSS Class</h2>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-medium text-gray-600 mb-2">SoH:</div>
              <div className="custom-soh">
                {`${sampleData.SoH.toFixed(2)}%`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Check;