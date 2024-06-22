import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, PlusCircleIcon, ShoppingCartIcon, UserIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">VJM Store</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <ul>
          <li>
            <Link to="/dashboard" className="flex items-center p-5 rounded hover:bg-gray-700">
              <HomeIcon className="h-6 w-6 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/products" className="flex items-center p-5 rounded hover:bg-gray-700">
              <ClipboardDocumentListIcon className="h-6 w-6 mr-3" />
              Products
            </Link>
          </li>
          <li>
            <Link to="/add-product" className="flex items-center p-5 rounded hover:bg-gray-700">
              <PlusCircleIcon className="h-6 w-6 mr-3" />
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/recent-purchase" className="flex items-center p-5 rounded hover:bg-gray-700">
              <ShoppingCartIcon className="h-6 w-6 mr-3" />
              Recent Purchase
            </Link>
          </li>
          <li>
            <Link to="/sale-records" className="flex items-center p-5 rounded hover:bg-gray-700">
              <ShoppingCartIcon className="h-6 w-6 mr-3" />
              Sale Records
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center p-5 rounded hover:bg-gray-700">
              <UserIcon className="h-6 w-6 mr-3" />
              Profile
            </Link>
          </li>
          <li className="mt-auto">
            <Link to="/logout" className="flex items-center p-5 rounded hover:bg-red-600">
              <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
