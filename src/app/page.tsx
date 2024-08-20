'use client'

import { useState } from "react";
import DeviceCard from "./components/DeviceCard";
import Link from 'next/link';
import { ref, get } from "firebase/database";
import { database } from "../app/firebaseConfig";

export default function Home() {
  const [devices, setDevices] = useState([
    { deviceId: '1', status: 'online', lastKnownTemperature: 22 },
    { deviceId: '2', status: 'offline', lastKnownTemperature: 18 },
    { deviceId: '3', status: 'offline', lastKnownTemperature: 25 },
    { deviceId: '4', status: 'offline', lastKnownTemperature: 25 },
    { deviceId: '5', status: 'offline', lastKnownTemperature: 25 },
    { deviceId: '6', status: 'offline', lastKnownTemperature: 25 },
  ]);

  const handleCompleteShipment = async (deviceId: string) => {
      setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.deviceId === deviceId
          ? { ...device, status: 'offline' }
          : device
      )
    );
  };

  const handleInitiateShipment = (deviceId: string, email: string, minThreshold: number, maxThreshold: number) => {
    // Update the device status to 'online'
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.deviceId === deviceId
          ? { ...device, status: 'online' }
          : device
      )
    );

    // Store the shipment data in localStorage
    localStorage.setItem(`${deviceId}-email`, email);
    localStorage.setItem(`${deviceId}-minThreshold`, minThreshold.toString());
    localStorage.setItem(`${deviceId}-maxThreshold`, maxThreshold.toString());
    localStorage.setItem(`${deviceId}-isOnline`, 'true');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between bg-gray-700 text-white p-4 px-6 md:px-10 h-[72px]">
        <div className="flex items-center gap-10">
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
      </header>

      <main className="container mx-auto py-10 min-h-[calc(100vh-128px)]">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Devices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {devices.map((device) => (
            <DeviceCard 
              key={device.deviceId} 
              device={device} 
              onCompleteShipment={handleCompleteShipment}
              onInitiateShipment={device.deviceId === '1' ? handleInitiateShipment : () => {}}
            />
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Temperature Monitor</p>
      </footer>
    </div>
  );
}
