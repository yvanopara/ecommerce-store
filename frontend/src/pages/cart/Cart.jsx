import React, { useContext, useState, useEffect } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

// Modal Component
function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default function Cart() {
  const { cartItems, addToCart, removeToCart, getTotalCartAmount, url, food_list, token } = useContext(StoreContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show modal if token is empty
    if (!token) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [token]);

  return (
    <div className="cart">
      {/* Modal */}
      {showModal && (
        <Modal
          message="Vous devez vous connecter pour pouvoir passer un achat"
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="cart-items">
        <div className="cart-items-title">
          <p><strong>Articles</strong>&#160;&#160;&#160;</p>
          <p><strong>Titre</strong></p>
          <p><strong>Prix</strong></p>
          <p><strong>Quantité</strong>&#160;&#160;&#160;</p> 
          <p><strong>Total</strong></p>
          <p><strong>Supprimer</strong></p>
        </div>
        <br />
        <hr />
        {food_list.length > 0 ? (
          food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}&#160;&#160;&#160;</p>
                  <p>{item.price} </p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <p className="cross" onClick={() => removeToCart(item._id)}><strong>x</strong></p>
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2 style={{ margin: '0px', padding: '0px' }}>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Sous-total</p>
              <p>{getTotalCartAmount()} FCFA</p>
            </div>
            <div className="cart-total-details">
              <p>Frais de livraison</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 1000 + " FCFA"}</p>
            </div>
            <div className="cart-total-details">
              <p style={{ marginTop: '15px', fontWeight: 'bold' }}>Total</p>
              <b style={{ marginTop: '15px', fontWeight: 'bold' }}>
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 1000} FCFA
              </b>
            </div>
            <hr />
          </div>
          <button style={{}} onClick={() => navigate('/order')}>Passer à la caisse</button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
