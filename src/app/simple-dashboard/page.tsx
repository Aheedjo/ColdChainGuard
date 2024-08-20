'use client';

import TemperatureGauge from "@/app/components/TempGuage";
import { useEffect, useState } from "react";
import TemperatureLineChart from "@/app/components/TempChart";
import { getTemperatureData } from "../../app/helpers/getTemperature";

export default function SimpleDashboard() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [minThreshold, setMinThreshold] = useState<number>(0);
  const [maxThreshold, setMaxThreshold] = useState<number>(40);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    getTemperatureData((temperature: number) => {
      setTemperature(parseFloat(temperature.toFixed(2)));
      if (temperature < minThreshold || temperature > maxThreshold) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    });

    if(!(minThreshold && maxThreshold)) {
      const minThresholdFromStorage = localStorage.getItem('1-minThreshold');
      const maxThresholdFromStorage = localStorage.getItem('1-maxThreshold');
    
      const minThreshold = minThresholdFromStorage !== null 
        ? parseInt(minThresholdFromStorage) 
        : 0;
      const maxThreshold = maxThresholdFromStorage !== null 
        ? parseInt(maxThresholdFromStorage) 
        : 40;
    
      setMinThreshold(minThreshold);
      setMaxThreshold(maxThreshold);
    }

  }, [minThreshold, maxThreshold]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="pt-10 bg-gray-800">
        {showAlert && (
          <div className="bg-red-600 bg-opacity-30 border border-red-600 text-red-600 rounded-lg py-3 px-5 text-center fixed top-2 left-1/2 -translate-x-1/2 inset-x-0 z-50 w-max">
            <p className="text-lg font-semibold">Alert: Temperature is out of the threshold range!</p>
          </div>
        )}

        <TemperatureGauge temperature={temperature} minThreshold={minThreshold} maxThreshold={maxThreshold} />

        <main className="flex lg:flex-1 flex-col items-center justify-center p-6 bg-gray-100">
          <div className="text-center">
            {temperature !== null ? (
              <h2 className="text-xl md:text-3xl font-semibold text-gray-800">Current Temperature: {temperature}°C</h2>
            ) : (
              <p className="text-xl text-gray-600">Loading...</p>
            )}
          </div>
        </main>

        <TemperatureLineChart />

        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2024 Temperature Monitor</p>
        </footer>
      </div>
    </div>
  );
}
