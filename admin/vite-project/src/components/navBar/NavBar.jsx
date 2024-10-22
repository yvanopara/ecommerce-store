import './navBar.css'
import React from 'react'
import {assets} from '../../assets/assets'

export default function NavBar() {
  return (
    <div className='navBar'>
        <img style={{height:'50px'}} className='logo' src={assets.logo}alt="logo" />
        <img className='profile' src={assets.profile_icon} alt="logo" />
        

      
    </div>
  )
}
