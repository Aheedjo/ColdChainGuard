"use client";

import { useState } from "react";
import Modal from "react-modal";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const CustomerDashboard = () => {
  const router = useRouter();
  
  // Dummy data for shipments
  const [shipments, setShipments] = useState([
    { shipmentId: "1", deliveryLocation: "New York", createdAt: "2024-08-15" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShipmentId, setNewShipmentId] = useState("");
  const [newDeliveryLocation, setNewDeliveryLocation] = useState("");
  const [minThreshold, setMinThreshold] = useState<number>(0);
  const [maxThreshold, setMaxThreshold] = useState<number>(40);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewShipmentId("");
    setNewDeliveryLocation("");
    setMinThreshold(0);
    setMaxThreshold(40);
  };

  const handleCreateShipment = () => {
    const newShipment = {
      shipmentId: newShipmentId,
      deliveryLocation: newDeliveryLocation,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setShipments([...shipments, newShipment]);
    closeModal();
  };

  const handleRowClick = (shipmentId: string) => {
    router.push(`/shipment/${shipmentId}`);
  };

  const handleLogout = () => {
    router.push('/signin');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
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
        <div className="flex items-center gap-4">
          <button
            onClick={openModal}
            className="font-medium bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-white transition-all"
          >
            Manage Shipments and Thresholds
          </button>
          <button
            onClick={handleLogout}
            className="font-medium bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto py-10 min-h-[calc(100vh-128px)]">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Shipments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4 text-left">Shipment ID</th>
                <th className="py-2 px-4 text-left">Delivery Location</th>
                <th className="py-2 px-4 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr
                  key={shipment.shipmentId}
                  className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(shipment.shipmentId)}
                >
                  <td className="py-2 px-4">{shipment.shipmentId}</td>
                  <td className="py-2 px-4">{shipment.deliveryLocation}</td>
                  <td className="py-2 px-4">{shipment.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Temperature Monitor</p>
      </footer>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
      >
        <div className="bg-white p-6 shadow-lg max-w-md w-full text-gray-800 relative">
          <div
            className="absolute right-5 top-5 cursor-pointer px-2 py-1 rounded-md bg-white hover:bg-gray-800 hover:text-white transition-all"
            onClick={closeModal}
          >
            <p>X</p>
          </div>
          <h2 className="text-xl font-semibold mb-4">Manage Shipments and Set Thresholds</h2>

          <label className="block mb-2">
            Shipment ID:
            <input
              type="text"
              value={newShipmentId}
              onChange={(e) => setNewShipmentId(e.target.value)}
              className="ml-2 p-2 border rounded w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Delivery Location:
            <input
              type="text"
              value={newDeliveryLocation}
              onChange={(e) => setNewDeliveryLocation(e.target.value)}
              className="ml-2 p-2 border rounded w-full"
              required
            />
          </label>

          <h3 className="text-lg font-semibold mt-4 mb-2">Set Temperature Thresholds</h3>
          <label className="block mb-2">
            Min Threshold:
            <input
              type="number"
              value={minThreshold}
              onChange={(e) => setMinThreshold(Number(e.target.value))}
              className="ml-2 p-2 border rounded w-full"
              required
            />
          </label>
          <label className="block mb-4">
            Max Threshold:
            <input
              type="number"
              value={maxThreshold}
              onChange={(e) => setMaxThreshold(Number(e.target.value))}
              className="ml-2 p-2 border rounded w-full"
              required
            />
          </label>

          <div className="flex gap-4">
            <button
              onClick={handleCreateShipment}
              className="bg-gray-800 text-white p-2 rounded hover:bg-teal-600 transition duration-300 w-full"
            >
              Create Shipment
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition duration-300 w-full"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerDashboard;
