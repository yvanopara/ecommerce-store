import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

export default function StoreContextProvider(props) {
  const [cartItems, setCartItems] = useState({});
  const url = 'https://landry-store.onrender.com';
  const [token, setToken] = useState('');
  const [food_list, setFood_list] = useState([]);

  // State for controlling "plus" category visibility
  const [showPlusCategory, setShowPlusCategory] = useState(() => {
    // Initialize from localStorage or default to false
    return JSON.parse(localStorage.getItem('showPlusCategory')) || false;
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('showPlusCategory', JSON.stringify(showPlusCategory));
  }, [showPlusCategory]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
    }
  };

  const removeToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) { // Ensure itemInfo is defined
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + '/api/food/list');
    setFood_list(response.data.data);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeToCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    // Add showPlusCategory state and the function to toggle it
    showPlusCategory,
    setShowPlusCategory,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}
