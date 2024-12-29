import React from 'react'
import NavBar from './components/navBar/NavBar'
import SideBar from './components/sideBar/SideBar'
import Add from './pages/add/Add'
import Order from './pages/order/Order'

import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import List from './pages/list/List'


export default function App() {
  const url = 'http://localhost:5000'
  return (
    <div className=''>
      <  ToastContainer />
      <NavBar/>
      <hr/>
      <div className='app-content'>
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Order url={url}/>}/>
        </Routes>
      </div>
      
    </div>
  )
}
