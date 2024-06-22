import React, { useState, useEffect, useCallback } from 'react';
import ProductPurchase from './ProductPurchase';
import Cart from './Cart';
import { purchaseProduct, fetchProducts } from '../services/api';
import { Link } from 'react-router-dom';
import Modal from '../components/modal';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then(response => {
        console.log('Fetched products:', response.data); 
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const calculateTotalAmount = useCallback(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cartItems]);

  useEffect(() => {
    calculateTotalAmount();
  }, [cartItems, calculateTotalAmount]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  const handleQuantityChange = (product, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  const handlePurchase = () => {
    setIsLoading(true);
    const purchaseData = cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      total_amount: item.price * item.quantity,
    }));

    purchaseProduct(purchaseData)
      .then(response => {
        setIsLoading(false);
        setIsModalOpen(true);
        setCartItems([]);
        setTotalAmount(0);
      })
      .catch(error => {
        console.error('Error making purchase:', error);
        setIsLoading(false);
      });
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">Vjm Store</h1>
          <Link to='/login' className='text-gray-600 hover:text-gray-800 font-semibold text-lg'>Login</Link>
        </div>
      </header>

      <div className="container mx-auto py-8 px-6">
        <div className="flex">
          <div className="w-2/3 pr-8">
            <div className="mt-4">
              {filteredProducts.length > 0 ? (
                <ProductPurchase
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
                />
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>
          <div className="w-1/3">
            <Cart
              cartItems={cartItems}
              onQuantityChange={handleQuantityChange}
              totalAmount={totalAmount}
              onPurchase={handlePurchase}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={closeModal}>
        {isLoading ? (
          <div className="flex items-center justify-center p-6">
            <div className="loader mr-4"></div>
            <p className="text-lg font-semibold">Processing...</p>
          </div>
        ) : (
          <div className="text-center p-6">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Purchase Successful!</h2>
            <p className="text-lg text-gray-700">Your purchase has been successfully completed.</p>
            <button
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
