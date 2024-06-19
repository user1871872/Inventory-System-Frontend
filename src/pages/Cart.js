import React from 'react';

const Cart = ({ cartItems, onQuantityChange, totalAmount, onPurchase }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-4">Cart</h1>
      <ul className="mb-4">
        {cartItems.map((item, index) => (
          <li key={index} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => onQuantityChange(item, item.quantity - 1)}
                className="px-2 py-1 bg-gray-300 rounded-md"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => onQuantityChange(item, item.quantity + 1)}
                className="px-2 py-1 bg-gray-300 rounded-md"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold">Total Amount: ${totalAmount}</h2>
        <button
          onClick={onPurchase}
          className="w-full mt-4 p-2 bg-blue-600 text-white rounded-md"
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default Cart;
