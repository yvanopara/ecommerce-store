import React, { useContext } from 'react'
import './foodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

import '@fontsource/baloo-tammudu-2/700.css'; // Bold
import '@fontsource/mohave/500.css'; // Light


import '@fontsource/mirza/400.css'; // Medium
import '@fontsource/anton'; // Anton has only one weight (400)







export default function FoodItem({id,name,price,description,image}) {


  const { cartItems, addToCart, removeToCart,url } = useContext(StoreContext); 
  return (
    
    <div className='food-item'>
      
        <div className="food-item-img-container">
            <img className='food-item-image' src={url + '/images/'+ image} alt='' />
            {!cartItems[id]

            ?<img className='add'onClick={()=> addToCart(id)} src={assets.add_icon_white} alt=''/>

            :<div className='food-item-counter'>

              <img onClick={()=> removeToCart(id)} src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={()=>addToCart(id) } src={assets.add_icon_green} alt="" />

            </div>
            }
        </div>
        
        <div className="food-item-info">

            <div className='food-item-name-rating'>
                <p >{name}</p>
                <img src={assets.rating_starts} alt='' />
            </div>

            <p  className='food-item-desc'>{description}</p>
            <p  className='food-item-price'>{price} FCFA</p>

        </div>
        
    </div>
  )
}
