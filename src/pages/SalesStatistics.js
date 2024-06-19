import React, { useState, useEffect } from 'react';
import { fetchSalesStatistics } from '../services/api';

const SalesStatistics = () => {
  const [statistics, setStatistics] = useState({
    daily_total: 0,
    weekly_total: 0,
    monthly_total: 0,
  });

  useEffect(() => {
    fetchSalesStatistics()
      .then((response) => {
        if (response.data) {
          setStatistics(response.data);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching sales statistics:', error);
      });
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Sales Statistics</h1>
      <div className="flex justify-between mb-4">
        <div className="w-1/3 bg-blue-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Daily Sales</h2>
          <p className="text-2xl font-bold">${statistics.daily_total}</p>
        </div>
        <div className="w-1/3 bg-green-200 p-4 rounded-lg mx-4">
          <h2 className="text-lg font-semibold mb-2">Weekly Sales</h2>
          <p className="text-2xl font-bold">${statistics.weekly_total}</p>
        </div>
        <div className="w-1/3 bg-yellow-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Monthly Sales</h2>
          <p className="text-2xl font-bold">${statistics.monthly_total}</p>
        </div>
      </div>
    </div>
  );
};

export default SalesStatistics;
