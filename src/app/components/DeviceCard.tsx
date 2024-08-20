'use client'

import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-modal';

interface DeviceCardProps {
  device: {
    deviceId: string;
    status: string;
    lastKnownTemperature: number | null;
  };
  onCompleteShipment: (deviceId: string) => void;
  onInitiateShipment: (deviceId: string, email: string, minThreshold: number, maxThreshold: number) => void | null;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onCompleteShipment, onInitiateShipment }) => {
  const { deviceId, status, lastKnownTemperature } = device;
  const [isShipmentModalOpen, setIsShipmentModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [minThreshold, setMinThreshold] = useState(0);
  const [maxThreshold, setMaxThreshold] = useState(40);

  const openShipmentModal = () => setIsShipmentModalOpen(true);
  const closeShipmentModal = () => setIsShipmentModalOpen(false);

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = Number(e.target.value);
    if (type === 'min') setMinThreshold(value);
    else setMaxThreshold(value);
  };

  const handleCompleteShipment = (deviceId: string) => {
    // Clear data from localStorage
    localStorage.clear();

    // Call the parent callback to handle shipment completion logic
    onCompleteShipment(deviceId);
  };

  const handleInitiateShipment = () => {
    // Pass the shipment data to the parent component
    onInitiateShipment(deviceId, email, minThreshold, maxThreshold);

    // Close the modal
    closeShipmentModal();
  };

  return (
    <div className={`p-4 border rounded-lg shadow-md ${status === 'online' ? 'bg-green-50' : 'bg-red-50'} text-gray-800`}>
      <h3 className="text-xl font-bold mb-2">Device {deviceId}</h3>
      <p className="mb-2">Status: <span className={`font-semibold ${status === 'online' ? 'text-green-600' : 'text-red-600'}`}>{status}</span></p>
      
      {status === 'offline' ? (
        <p>Last Known Temperature: <span className="font-semibold">{lastKnownTemperature !== null ? `${lastKnownTemperature}°C` : 'No data available'}</span></p>
      ) : (
        <p>-</p>
      )}

      {status === 'online' ? (
        <div className="grid grid-cols-[40%_57%] w-full items-center gap-2 max-w-full">
          <Link href={`/device/${deviceId}`}>
            <button className="mt-4 w-full bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600 transition text-sm">
              View Details
            </button>
          </Link>
          <button 
            onClick={() => handleCompleteShipment(deviceId)} 
            className="mt-4 bg-red-600 text-white p-2 rounded-md hover:bg-red-800 transition-all text-sm "
          >
            Complete Shipment
          </button>
        </div>
       ) : (
        <>
          <button 
            onClick={openShipmentModal} 
            className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-600 transition whitespace-nowrap">
            Initiate Shipment
          </button>

          <Modal
            isOpen={isShipmentModalOpen}
            onRequestClose={closeShipmentModal}
            className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
          >
            <div className="bg-white p-6 shadow-lg max-w-md w-full text-gray-800 relative">
              <div className="absolute right-5 top-5 cursor-pointer px-2 py-1 rounded-md bg-white hover:bg-gray-800 hover:text-white transition-all" onClick={closeShipmentModal}>
                <p>X</p>
              </div>
              <h2 className="text-xl font-semibold mb-4">Initialize Shipment</h2>
              <label className="block mb-2">
                Email: 
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-2 p-2 border rounded w-full"
                />
              </label>
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
                onClick={handleInitiateShipment}
                className="bg-gray-800 text-white p-2 rounded hover:bg-teal-600 transition duration-300 w-full"
              >
                Start Shipment
              </button>
            </div>
          </Modal>
        </>
       )}
    </div>
  );
};

export default DeviceCard;
