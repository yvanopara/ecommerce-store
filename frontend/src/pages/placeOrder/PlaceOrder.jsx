import React, { useContext } from 'react'
import './placeOrder.css'
import { StoreContext } from '../../context/StoreContext';

export default function PlaceOrder() {

  const { cartItems, addToCart, removeToCart, getTotalCartAmount } = useContext(StoreContext);


  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multy-fields'>
          <input type='text' placeholder='first-name' />
          <input type='text' placeholder='last-name' />

        </div>
        <input type='text' placeholder='Email address' />
        <input type='text' placeholder='street' />


        <div className='multy-fields'>
          <input type='text' placeholder='Zip code' />
          <input type='text' placeholder='Country' />
        </div>
        <input type='text' placeholder='Phone' />
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2 style={{ margin: '0px', padding: '0px' }}>Cart Totals</h2>
          <div >
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount}FCFA</p>
            </div>
            <div className='cart-total-details'>
              <p>Delivery fess</p>
              <p>{getTotalCartAmount() === 0 ? 0:2}</p>
            </div>
            <div className='cart-total-details'>
              <b>Total</b>
              <b> {getTotalCartAmount() === 0 ? 0: getTotalCartAmount()+2}FCFA</b>

            </div>
            <hr />


          </div>
          <button>PROCEED TO PAY</button>

        </div>


      </div>
    </form>
  )
}
