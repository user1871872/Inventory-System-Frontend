import React, { useState, useEffect, useCallback } from 'react';
import ProductsList from './ProductsList';
import Cart from './Cart';
import { purchaseProduct } from '../services/api';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

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

  const handleQuantityChange = (product, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  const handlePurchase = () => {
    const purchaseData = cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      total_amount: item.price * item.quantity,
    }));

    purchaseProduct(purchaseData)
      .then(response => {
        setCartItems([]);
        setTotalAmount(0);
        alert('Purchase successful!');
      })
      .catch(error => {
        console.error('Error making purchase:', error);
      });
  };

  return (
    <div className="flex">
      <div className="w-1/2">
        <ProductsList onAddToCart={handleAddToCart} />
      </div>
      <div className="w-1/2">
        <Cart
          cartItems={cartItems}
          onQuantityChange={handleQuantityChange}
          totalAmount={totalAmount}
          onPurchase={handlePurchase}
        />
      </div>
    </div>
  );
};

export default Home;
