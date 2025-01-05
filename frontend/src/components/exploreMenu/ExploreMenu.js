import React from 'react'
import './exploreMenu.css'
import {menu_list} from '../../assets/assets'

import '@fontsource/rowdies/700.css'; // Light


import '@fontsource/signika-negative/600.css'; // Semi-Bold



export default function ExploreMenu({category, setCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
      
        <h1>Explorez Les Differentes Categories</h1>
      
      
      {/* <p style={{fontSize:'20px', color:'black',paddingLeft:'0'}}>Welcome to Restaurant Name, where we dedicated to providing an unforgettable dining experience...</p> */}

      <div className='explore-menu-list'>
       {menu_list.map((item,index)=>{
        return( 
            <div onClick={() =>setCategory(prev=>prev===item.menu_name?'':item.menu_name)} key={index} className='explore-menu-list-item'>
              {/* setCategory(prev => ...);  prev is a parameter that represents the current value of the category state at the time of the update.  */}
                <img className={category===item.menu_name?'active':''} src={item.menu_image} alt=''/>
                <p>{item.menu_name ||'empty'}</p>
            </div>

        )
       }
    )}
       
      </div>
      <hr />
    </div>
  )
}
