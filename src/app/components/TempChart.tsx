import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { useEffect, useState } from 'react';
import { getHistoricalTemperatureData } from '../helpers/getHistoricalTemperature';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const TemperatureLineChart: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const historicalData = await getHistoricalTemperatureData();
      const labels = Object.keys(historicalData).map(timestamp => new Date(Number(timestamp)).toLocaleTimeString());
      const values = Object.values(historicalData);

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
    <div className="p-4 bg-white shadow-lg rounded-lg text-gray-800">
      <h2 className="text-xl font-semibold mb-4">Temperature Trends (Last 2 Hours)</h2>
      {data ? <Line data={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default TemperatureLineChart;
