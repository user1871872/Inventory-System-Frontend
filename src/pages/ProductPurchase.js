import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

const ProductsList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((response) => {
      // Filter out products with quantity 0
      const filteredProducts = response.data.filter((product) => product.quantity > 0);
      setProducts(filteredProducts);
      setFilteredProducts(filteredProducts); // Initialize filteredProducts with all products
    });
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-4">Products</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="px-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
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
