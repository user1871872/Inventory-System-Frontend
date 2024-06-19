import React, { useEffect, useState } from 'react'
import {listPurchases} from '../services/api'


const RecentPurchase = () => {
  const [sales, getRecent] = useState([])

  useEffect(() => {
    listPurchases().then((response) => {
      getRecent(response.data);
    })
  },[])
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-4">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sales.map((recent) => (
          <li
            key={recent.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
           
          >
            <h2 className="text-lg font-semibold mb-2">{recent.product}</h2>
            <p className="text-lg font-bold">${recent.total_amount}</p>
            <p className="text-lg font-bold">Quantity:{recent.quantity}</p>
            <p className="text-gray-500">Date: {recent.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RecentPurchase