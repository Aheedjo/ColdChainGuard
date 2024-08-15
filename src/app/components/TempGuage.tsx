'use client'

import React from 'react';
import GaugeChart from 'react-gauge-chart';

interface TemperatureGaugeProps {
  temperature: number | null;
  minThreshold: number | null;
  maxThreshold: number | null;
}

const TemperatureGauge: React.FC<TemperatureGaugeProps> = ({ temperature, minThreshold, maxThreshold }) => {
  // Define the gauge color based on temperature
  const getColor = (temp: number) => {
    if (temp < 10) return '#3B82F6'; // Light Blue for cold
    if (temp < 20) return '#34D399'; // Light Green for moderate
    if (temp < 30) return '#FBBF24'; // Amber for warm
    return '#EF4444'; // Red for hot
  };

  if (temperature === null) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-gray-800 shadow-lg">
        <p className="text-xl text-gray-300">Fetching data...</p>
      </div>
    );
  }

  // Calculate percentage (assuming a scale of 0 to 40°C for example)
  const percentage = Math.min(temperature / 40, 1);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-800 shadow-lg relative">
      <GaugeChart
        id="temperature-gauge"
        nrOfLevels={30}
        percent={percentage}
        colors={[getColor(temperature)]}
        arcWidth={0.3}
        needleColor="#E5E7EB"
        formatTextValue={() => `${temperature}°C`}
      />

      <div className="text-center absolute right-10 top-0">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Thresholds</h3>
        <p className="text-lg text-gray-100">Min Threshold: <span className="font-semibold">{minThreshold}°C</span></p>
        <p className="text-lg text-gray-100">Max Threshold: <span className="font-semibold">{maxThreshold}°C</span></p>
      </div>
    </div>
  );
};

export default TemperatureGauge;
