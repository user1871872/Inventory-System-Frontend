import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

const ProductsList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-4">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
            onClick={() => onAddToCart(product)}
          >
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <p className="text-gray-500">Available Quantity: {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
