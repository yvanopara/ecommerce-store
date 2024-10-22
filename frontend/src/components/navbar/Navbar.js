import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

export default function Navbar({setShowLoginPopup}) {

    const [menu, setMenu] = useState('menu')
    const { getTotalCartAmount } = useContext(StoreContext); 

  return (
    <div className='navbar'>
        <img src={assets.logo} className='logo'/>
        <ul className='navbar-menu'>
        <Link to='/'> <a onClick={()=>setMenu('home')} className={menu==='home'?'active':''}>home</a></Link>
        <Link to='/'><a onClick={()=>setMenu('menu')} className={menu==='menu'?'active':''}>menu</a></Link>
            <a onClick={()=>setMenu('mobile-app')} className={menu==='mobile-app'?'active':''}>mobile-app</a>
            <a onClick={()=>setMenu('contact us')} className={menu==='contact us'?'active':''}>contact us</a>
        </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt=''/>
                <div className='assets-basket_icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt=''/></Link>
                    <div className={getTotalCartAmount() === 0?'':'dot' }></div>
                </div>
                <button onClick={()=>setShowLoginPopup(true)}>sign in</button>
                

            </div>
        
      
    </div>
  )
}
