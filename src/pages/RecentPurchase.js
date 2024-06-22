import React, { useEffect, useState } from 'react';
import { listPurchases } from '../services/api';

const RecentPurchase = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    listPurchases().then((response) => {
      setSales(response.data);
    });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-4">Recent Purchases</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-2 px-4 font-semibold text-sm">Product</th>
              <th className="text-left py-2 px-4 font-semibold text-sm">Total Amount</th>
              <th className="text-left py-2 px-4 font-semibold text-sm">Quantity</th>
              <th className="text-left py-2 px-4 font-semibold text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((recent) => (
              <tr key={recent.id} className="hover:bg-gray-100">
                <td className="py-2 px-4">{recent.product_name}</td>
                <td className="py-2 px-4">${recent.total_amount}</td>
                <td className="py-2 px-4">{recent.quantity}</td>
                <td className="py-2 px-4">{formatDate(recent.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPurchase;
