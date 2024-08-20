import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, PointElement } from 'chart.js';
import { useEffect, useState } from 'react';
import { getHistoricalTemperatureData } from "../../app/helpers/getHistoricalTemperature";

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, PointElement);

const TemperatureLineChart: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [tamperingDetected, setTamperingDetected] = useState(false);
  const SPIKE_THRESHOLD = 10; // Define spike threshold
  const MAX_ENTRIES = 20; // Maximum number of entries to display

  useEffect(() => {
    const fetchData = async () => {
      // Fetch historical data
      const historicalData = (await getHistoricalTemperatureData()).data;

      // Convert object to array and sort by timestamp
      const entries = Object.entries(historicalData).map(([key, value]: any) => [Number(key), value.temperature]);
      entries.sort((a, b) => a[0] - b[0]);

      // Limit to the last MAX_ENTRIES entries
      const recentEntries = entries.slice(-MAX_ENTRIES);

      // Extract timestamps and temperatures from recent entries
      const labels = recentEntries.map(([timestamp]) => {
        const date = new Date(timestamp);
        date.setHours(date.getHours() + 2); // Add 2 hours
        return date.toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
      });
      const values = recentEntries.map(([_, temp]) => temp);

      // Detect sudden spikes
      let previousTemp: number | null = null;
      let detectedSpike = false;
      recentEntries.forEach(([_, temp]) => {
        if (previousTemp !== null) {
          const change = temp - previousTemp;

          if (Math.abs(change) >= SPIKE_THRESHOLD) {
            detectedSpike = true;
            console.log('Spike detected!', { temp, previousTemp, change });
          }
        }
        previousTemp = temp;
      });

      setTamperingDetected(detectedSpike);

      setData({
        labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: values,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            fill: true,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg text-gray-800 px-6 md:px-10 py-10">
      <h2 className="text-xl font-semibold mb-4">Temperature Trends</h2>
      {data ? (
        <>
          <Line data={data} />
          {tamperingDetected && <p className="text-red-600 font-bold mt-5">Tampering detected! Significant temperature spike noticed.</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TemperatureLineChart;
