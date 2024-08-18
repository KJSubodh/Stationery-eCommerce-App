import React, { useState } from 'react';
import './PrinterEssentials.css'; // Ensure the path is correct
import printerEssentialsData from './PrinterEssentials.json'; // Ensure the path is correct
import { proceedToCheckout } from './Invoice'; // Import the checkout function

const PrinterEssentials = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: ''
  });

  const parsePrice = (priceString) => {
    const numericPrice = priceString.replace(/[^0-9.-]+/g, '');
    return parseFloat(numericPrice);
  };

  const addToCart = (item) => {
    const price = parsePrice(item.price);
    if (isNaN(price)) {
      console.error(`Invalid price for item: ${item.name}`);
      return;
    }
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setTotal(prevTotal => prevTotal + price);
  };

  const removeFromCart = (item) => {
    const price = parsePrice(item.price);
    if (isNaN(price)) {
      console.error(`Invalid price for item: ${item.name}`);
      return;
    }
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        setCart(cart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ));
      } else {
        setCart(cart.filter(cartItem => cartItem.name !== item.name));
      }
      setTotal(prevTotal => prevTotal - price);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="printer-essentials-container">
      <h2>Printer Essentials</h2>
      <div className="printer-essentials-grid">
        {printerEssentialsData.map((item, index) => {
          const price = parsePrice(item.price);
          return (
            <div key={index} className="printer-essentials-item">
              <img src={item.image} alt={item.name} className="printer-essentials-image" />
              <h3 className="printer-essentials-title">{item.name}</h3>
              <p className="printer-essentials-description">{item.description}</p>
              <p className="printer-essentials-price">
                ₹{!isNaN(price) ? price.toFixed(2) : 'N/A'}
              </p>
              <button
                className="printer-essentials-button"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      <button
        className="toggle-cart-button"
        onClick={toggleCartVisibility}
      >
        {isCartVisible ? 'Hide Cart' : 'Show Cart'}
      </button>

      {isCartVisible && (
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <ul>
            {cart.map((cartItem, index) => (
              <li key={index}>
                {cartItem.name} - {cartItem.quantity} x ₹{parsePrice(cartItem.price).toFixed(2)}
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(cartItem)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h4>Total: ₹{total.toFixed(2)}</h4>

          <div className="customer-details-form">
            <h4>Enter Your Details</h4>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={customerDetails.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={customerDetails.phone}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={customerDetails.address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={customerDetails.pincode}
              onChange={handleInputChange}
            />
          </div>

          <button className='proceed-button'
            onClick={() => proceedToCheckout(cart, total, customerDetails)}
          > 
            Proceed to checkout 
          </button>
        </div>
      )}
    </div>
  );
};

export default PrinterEssentials;
