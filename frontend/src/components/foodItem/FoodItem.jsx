import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './foodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

import '@fontsource/baloo-tammudu-2/700.css'; // Bold 
import '@fontsource/mohave/500.css'; // Light
import '@fontsource/mirza/400.css'; // Medium 
import '@fontsource/anton'; // Anton has only one weight (400) font-family: 

export default function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeToCart, url } = useContext(StoreContext);
  const [showNotification, setShowNotification] = useState(false); // State for notification
  const navigate = useNavigate();

  const handleAddToCart = (id) => {
    addToCart(id);
    setShowNotification(true); // Show the notification
    setTimeout(() => {
      setShowNotification(false); // Hide the notification after 2 seconds
    }, 2000);
  };

  const handleBuyNow = () => {
    // Navigate to Order Summary page with the selected item data
    navigate('/order-summary', { state: { id, name, price, description, image } });
  };

  return (
    <div className='food-item'>
      {/* Item Added Notification */}
      {showNotification && (
        <div className='item-added-notification'>
          Ajouté au panier!
        </div>
      )}

      <div className="food-item-img-container" onClick={handleBuyNow}>
        <img className='food-item-image' src={url + '/images/' + image} alt={name} />
        {!cartItems[id] ? (
          <img
            className='add'
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering handleBuyNow
              handleAddToCart(id);
            }}
            src={assets.add_icon_white}
            alt=''
          />
        ) : (
          <div className='food-item-counter'>
            <img onClick={(e) => {
              e.stopPropagation(); // Prevent triggering handleBuyNow
              removeToCart(id);
            }} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={(e) => {
              e.stopPropagation(); // Prevent triggering handleBuyNow
              addToCart(id);
            }} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt='' />
        </div>

        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>{price} FCFA</p>
      </div>
    </div>
  );
}
