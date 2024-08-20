// src/app/manual/page.tsx
'use client';

import Link from 'next/link';

export default function ManualPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <header className="flex items-center justify-between bg-gray-700 text-white p-4 px-6 md:px-10 h-[72px]">
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
      </header>

      <main className='p-10 container'>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-lg leading-relaxed">
            Welcome to ColdChainGuard, your solution for monitoring the temperature of your shipments. This platform allows you to monitor multiple devices that track the temperature of goods during transport. Here’s how it works:
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Devices Overview</h2>
          <p className="text-lg leading-relaxed">
            Each device is equipped with a temperature sensor that reads the current temperature of the shipment. When a device is turned on and connected, it will automatically indicate an <strong>Online</strong> status and begin reading and transmitting temperature data.
          </p>
          <p className="text-lg leading-relaxed">
            If a device is <strong>Offline</strong>, it means the device is either turned off, disconnected, or out of range. In this case, the last known temperature before the device went offline will be displayed.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Monitoring Temperature</h2>
          <p className="text-lg leading-relaxed">
            For each device that is online, you will see the <strong>Current Temperature</strong> displayed in real-time. If the temperature goes outside the predefined safe range, an alert will be triggered to notify you immediately.
          </p>
          <p className="text-lg leading-relaxed">
            If a device goes offline, you can still view the <strong>Last Known Temperature</strong>. This helps you keep track of the conditions before the device lost connection.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Setting Temperature Thresholds</h2>
          <p className="text-lg leading-relaxed">
            You can set minimum and maximum temperature thresholds for each shipment. If the temperature falls below or rises above these thresholds, an alert will notify you so that you can take appropriate action to ensure the safety of your goods.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Accessing Device Details</h2>
          <p className="text-lg leading-relaxed">
            By clicking on a device, you can view detailed information about its status and temperature history. This page allows you to monitor the specific conditions of each shipment and make informed decisions.
          </p>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Temperature Monitor</p>
      </footer>
    </div>
  );
}
