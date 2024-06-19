import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">MyApp</h1>
      </div>
      <nav className="flex-1 px-2 py-4">
        <ul>
          <li className="mb-2">
            <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/products" className="block p-2 rounded hover:bg-gray-700">
              Products
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/recent-purchase" className="block p-2 rounded hover:bg-gray-700">
              Recent Purchase
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/profile" className="block p-2 rounded hover:bg-gray-700">
              Profile
            </Link>
          </li>
          <li className="mt-auto">
            <Link to="/logout" className="block p-2 rounded hover:bg-red-600">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
