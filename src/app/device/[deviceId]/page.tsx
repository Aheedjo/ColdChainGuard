'use client';

import TemperatureGauge from "@/app/components/TempGuage";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import Link from 'next/link';
import { getTemperatureData } from "../../../app/helpers/getTemperature";
import TemperatureLineChart from "@/app/components/TempChart";
import emailjs from 'emailjs-com';

export default function Dashboard() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [minThreshold, setMinThreshold] = useState<number>(0);
  const [maxThreshold, setMaxThreshold] = useState<number>(40);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const userEmail = localStorage.getItem('user-email') || 'maishanuahidjo@gmail.com';

  useEffect(() => {
    getTemperatureData((temperature: number) => {
      setTemperature(parseFloat(temperature.toFixed(2)));
      if (temperature < minThreshold || temperature > maxThreshold) {
        setShowAlert(true);
        // sendEmailAlert(temperature);
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

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = Number(e.target.value);
    if (type === 'min') setMinThreshold(value);
    else setMaxThreshold(value);
  };

  const sendEmailAlert = (temp: number) => {
    const templateParams = {
      subject: 'ColdChain',
      message: `The current temperature is ${temp}°C, which is outside the set threshold of ${minThreshold}°C - ${maxThreshold}°C.`,
      email: userEmail,
    };
  
    emailjs.send('service_739q0fs', 'template_o8veyrt', templateParams, '1qjUF6DjZjE5gJPhV')
      .then((result: any) => {
        console.log('Email successfully sent!', result.text);
      }, (error: any) => {
        console.error('Error sending email:', error.text);
      });
  };  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {showAlert && (
        <div className="bg-red-600 bg-opacity-30 border border-red-600 text-red-600 rounded-lg py-3 px-5 text-center fixed top-2 left-1/2 -translate-x-1/2 inset-x-0 z-50 w-max">
          <p className="text-lg font-semibold">Alert: Temperature is out of the threshold range!</p>
        </div>
      )}

      {/* <header className="flex items-center justify-between bg-gray-700 text-white p-4 px-6 md:px-10">
        <div className="flex items-center gap-7">
          <Link href="/">
            <h1 className="text-2xl font-bold mb-2 md:mb-0 cursor-pointer">ColdGuard</h1>
          </Link>
          <Link href="/">
            <p className="cursor-pointer hover:underline">Home</p>
          </Link>
          <Link href="/manual">
            <p className="cursor-pointer hover:underline">Manual</p>
          </Link>
          <Link href="/team">
            <p className="cursor-pointer hover:underline">Our Team</p>
          </Link>
        </div>
      </header> */}

      <header className="flex items-center justify-between bg-gray-700 text-white p-4 px-6 md:px-10 md:h-[72px]">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5 md:gap-10 mx-auto">
          <Link href="/">
            <h1 className="text-2xl font-bold mb-2 md:mb-0 cursor-pointer">ColdGuard</h1>
          </Link>
          <div className="flex items-center gap-10">
            <Link href="/">
              <p className="cursor-pointer hover:underline">Home</p>
            </Link>
            <Link href="/manual">
              <p className="cursor-pointer hover:underline">Manual</p>
            </Link>
            <Link href="/team">
              <p className="cursor-pointer hover:underline">Our Team</p>
            </Link>
          </div>
          <button 
            onClick={openModal}
            className="font-medium bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-white transition-all"
          >
            Set Threshold
          </button>
        </div>
      </header>
      
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
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
      >
        <div className="bg-white p-6 shadow-lg max-w-md w-full text-gray-800 relative">
          <div className="absolute right-5 top-5 cursor-pointer px-2 py-1 rounded-md bg-white hover:bg-gray-800 hover:text-white transition-all" onClick={closeModal}>
            <p>X</p>
          </div>
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
