import React, { useState, useEffect } from 'react';
import { saleRecords } from '../services/api';

const SaleRecords = () => {
  const [salesRecords, setSalesRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesRecords = async () => {
      try {
        const response = await saleRecords();
        console.log('API response:', response.data); // Log the fetched data

        if (response.data) {
          setSalesRecords(response.data);
        } else {
          console.error('No data available.');
        }
      } catch (error) {
        console.error('Error fetching sale records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesRecords();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return <div>Loading...</div>; // Replace with your loading indicator
  }

  return (
    <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Sale Records</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Daily Sales (₱)</th>
              <th className="py-3 px-4 text-left">Weekly Sales (₱)</th>
              <th className="py-3 px-4 text-left">Monthly Sales (₱)</th>
            </tr>
          </thead>
          <tbody>
            {salesRecords.map((record, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-4">{record.date}</td>
                <td className="py-3 px-4">{record.daily_total}</td>
                <td className="py-3 px-4">{record.weekly_total}</td>
                <td className="py-3 px-4">{record.monthly_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleRecords;
