import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Ensure all items have required properties
        const validCart = parsedCart.filter(item => 
          item && 
          typeof item.price === 'number' && 
          !isNaN(item.price)
        );
        setCartItems(validCart);
      } catch (error) {
        console.error('Error parsing cart:', error);
        setCartItems([]);
      }
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : 0;
      return total + price;
    }, 0);
  };

  const calculateTax = (subtotal) => {
    // Assuming 8% tax rate
    return subtotal * 0.08;
  };

  const handleRemoveItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return '$0.00';
    }
    return `$${price.toFixed(2)}`;
  };

  const subtotal = calculateTotal();
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  return (
    <div className="cart-container">
      <div className="cart-layout">
        <div className="cart-items">
          <h1>Shopping Cart</h1>
          <div className="cart-content">
            {cartItems.length > 0 ? (
              <div className="cart-items-list">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3>{item.name || 'Unnamed Product'}</h3>
                      <p className="retailer">Sold by: {item.retailer || 'Unknown Retailer'}</p>
                      <p className="price">{formatPrice(item.price)}</p>
                    </div>
                    <button 
                      className="remove-item-button"
                      onClick={() => handleRemoveItem(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <h3>Your cart is currently empty.</h3>
            )}
          </div>
        </div>
        <div className="cart-summary">
          <div className="summary-card">
            <h2>Total</h2>
            <div className="summary-content">
              <p>Subtotal: {formatPrice(subtotal)}</p>
              <p>Tax: {formatPrice(tax)}</p>
              <p className="total-amount">Total: {formatPrice(total)}</p>
            </div>
            <button className="checkout-button">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 