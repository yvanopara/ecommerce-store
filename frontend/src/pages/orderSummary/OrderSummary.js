import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './orderSummary.css';

import '@fontsource/anton'; // Anton has only one weight (400)
import '@fontsource/mirza/400.css'; // Medium 
import '@fontsource/baloo-tammudu-2/700.css'; // Bold
import '@fontsource/rowdies/700.css'; // Light  

export default function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { url, cartItems, addToCart, removeToCart } = useContext(StoreContext);
  const { id, name, price, description, image } = location.state || {};
  const [quantity, setQuantity] = useState(cartItems[id] || 0);

  // Ensure the page starts at the top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    addToCart(id);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      removeToCart(id);
    }
  };

  const handlePlaceOrder = () => {
    navigate('/order');
  };

  return (
    <div className="order-summary">
      <h1 className='header'>Detail du Produit</h1>
      {id ? (
        <div className="order-items">
          <div key={id} className="order-item">
            <img src={`${url}/images/${image}`} alt={name} className="order-item-image" />
            <div className="order-item-info">
              <h3 className='name'>{name}</h3>
              <p className='description'>{description}</p>
              <p className="total-price">Total: {price * quantity} FCFA</p>
            </div>
            <div className="quantity-adjust">
              <button className="reduce-btn" onClick={handleDecreaseQuantity}>-</button>
              <span className="quantity">{quantity}</span>
              <button className="increase-btn" onClick={handleIncreaseQuantity}>+</button>
            </div>
          </div>
        </div>
      ) : (
        <p>No product selected</p>
      )}
      <div className="place-order-btn-container">
        <button className="place-order-btn" onClick={handlePlaceOrder}>Passer à la caisse</button>
      </div>
    </div>
  );
}
