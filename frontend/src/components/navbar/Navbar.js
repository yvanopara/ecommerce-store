import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

import '@fontsource/great-vibes'; // This font has only one weight (400)
import '@fontsource/saira-stencil-one'; // This font has only one weight (400)



export default function Navbar({setShowLoginPopup}) {

    const [menu, setMenu] = useState('menu')
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate()
    const logOut = () => {
        setToken('')
        localStorage.removeItem('token')
        navigate('/')
       

    }

  return (
    <div className='navbar'>
        {/* <img src={assets.logo} className='logo'/> */}
        <p className='logoNamee' onClick={()=> navigate('/')}><span className='rotating-k' >K</span>-MyStore</p>
        <ul className='navbar-menu'>
        <Link to='/'> <a onClick={()=>setMenu('home')} className={menu==='home'?'active':''}>home</a></Link>
        <Link to='/'><a onClick={()=>setMenu('menu')} className={menu==='menu'?'active':''}>menu</a></Link>
            <a onClick={()=>setMenu('mobile-app')} className={menu==='mobile-app'?'active':''}>mobile-app</a>
            <a onClick={()=>setMenu('contact us')} className={menu==='contact us'?'active':''}>contact us</a>
        </ul>
            <div className='navbar-right'>
                {/* <img src={assets.search_icon} alt=''/> */}
                <div className='assets-basket_icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt=''/></Link>
                    <div className={getTotalCartAmount() === 0?'':'dot' }></div>
                </div>
                {!token ? (
          <button onClick={() => setShowLoginPopup(true)} aria-label="Sign in">se connecter</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile icon" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=> navigate('/myorders')}><img src={assets.bag_icon} alt="Bag icon" /><p>Orders</p></li>
              <hr/>
              <li onClick={logOut}><img src={assets.logout_icon} alt="Logout icon" /><p>Logout</p></li>
            </ul>
          </div>
        )}
                

            </div>
        
      
    </div>
  )
}
