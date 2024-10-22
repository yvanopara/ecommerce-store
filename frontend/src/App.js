import React, { useState } from 'react'

import './App.css'
import Navbar from './components/navbar/Navbar'
import Header from './components/header/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import Login from './components/logibPopup/Login'




const App = () => {
  const [showLogin, setShowLoginPopup] = useState(false);
  return (
    <>
    {showLogin?<Login setShowLoginPopup={setShowLoginPopup} />:<></>}
      <div className='App'>

        <Navbar setShowLoginPopup={setShowLoginPopup} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>


      </div>
      <Footer/>
    </>
  )
}

export default App
