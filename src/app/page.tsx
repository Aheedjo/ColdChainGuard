'use client'

import { useEffect, useState } from "react";
import { getTemperatureData } from "../app/helpers/getTemperature";
import TemperatureGauge from "./components/TempGuage";
// import TemperatureLineChart from "./components/TempChart";
import Modal from 'react-modal';

export default function Home() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [minThreshold, setMinThreshold] = useState<number>(0);
  const [maxThreshold, setMaxThreshold] = useState<number>(40);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getTemperatureData((data: any) => {
      setTemperature(data);
      if (data < minThreshold || data > maxThreshold) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    });
  }, [minThreshold, maxThreshold]);

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = Number(e.target.value);
    if (type === 'min') setMinThreshold(value);
    else setMaxThreshold(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Alert Banner */}
      {showAlert && (
        <div className="bg-red-600 text-white p-4 text-center fixed top-0 inset-x-0 z-50">
          <p className="text-lg font-semibold">Alert: Temperature is out of the threshold range!</p>
        </div>
      )}
      <header className="flex items-center justify-between bg-gray-700 text-white p-4 px-10">
        <h1 className="text-2xl font-bold">ColdGuard</h1>
        <button 
          onClick={openModal}
          className="font-medium bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-white transition-all"
        >
          Set Threshold
        </button>
      </header>
      
      <TemperatureGauge temperature={temperature} minThreshold={minThreshold} maxThreshold={maxThreshold} />

      <main className="flex flex-1 flex-col items-center justify-center p-6 bg-gray-100">
        <div className="text-center">
          {temperature !== null ? (
            <h2 className="text-3xl font-semibold text-gray-800">Current Temperature: {temperature}°C</h2>
          ) : (
            <p className="text-xl text-gray-600">Loading...</p>
          )}
        </div>
        
        {/* <TemperatureLineChart /> */}
      </main>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
      >
        <div className="bg-white p-6 shadow-lg max-w-md w-full text-gray-800">
          <h2 className="text-xl font-semibold mb-4">Set Temperature Thresholds</h2>
          <label className="block mb-2">
            Min Threshold: 
            <input 
              type="number"
              value={minThreshold}
              onChange={(e) => handleThresholdChange(e, 'min')}
              className="ml-2 p-2 border rounded w-full"
            />
          </label>
          <label className="block mb-4">
            Max Threshold: 
            <input 
              type="number"
              value={maxThreshold}
              onChange={(e) => handleThresholdChange(e, 'max')}
              className="ml-2 p-2 border rounded w-full"
            />
          </label>
          <button
            onClick={closeModal}
            className="bg-gray-800 text-white p-2 rounded hover:bg-teal-600 transition duration-300 w-full"
          >
            Save
          </button>
        </div>
      </Modal>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Temperature Monitor</p>
      </footer>
    </div>
  );
}
