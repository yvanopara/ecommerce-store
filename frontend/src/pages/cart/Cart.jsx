import React, { useContext } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { food_list } from '../../assets/assets';

export default function Cart() {
  const { cartItems, addToCart, removeToCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.length > 0 ? (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
              <div>
                <div  key={item._id} className='cart-items-title cart-items-item'>
                  <img src={url + "/images/"+ item.image} alt='' />
                  <p>{item.name}</p>
                  <p>{item.price} FCFA</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]} FCFA</p>
                  <p className='cross' onClick={() => removeToCart(item._id)}>x</p>
                </div>
              </div>
              );
            }
            // Explicitly return null for items that don't meet the condition
            return null;
          })
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2 style={{ margin: '0px', padding: '0px' }}>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} FCFA</p>
            </div>
            <div className='cart-total-details'>
              <p>Delivery fees</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <div className='cart-total-details'>
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2} FCFA</b>
            </div>
            <hr />
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-promocode'>
          <p>If you have a promo code, enter it here</p>
          <div className='cart-promocode-input'>
            <input type='text' placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
