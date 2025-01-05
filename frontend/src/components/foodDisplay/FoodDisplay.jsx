import React, { useContext } from 'react'; 
import './foodDisplay.css'; 
import { StoreContext } from '../../context/StoreContext'; 
import FoodItem from '../foodItem/FoodItem'; 
// import '@fontsource/lilita-one'; // Defaults to weight 400

import '@fontsource/rowdies/700.css'; // Light
// import '@fontsource/rowdies/400.css'; // Regular
// import '@fontsource/rowdies/700.css'; // Bold



export default function FoodDisplay({ category }) { 
    const { food_list } = useContext(StoreContext); 

    return ( 
        <div className='food-display' id='food-display'> 
            <p className='header1'>VOS ACHATS AU MEILLEUR PRIX</p> 
            <div className="food-display-list"> 
                {food_list.map((item, index) => { 
                    if (category === 'All' || category === item.category) { 
                        console.log(category, item.category); 
                        return ( 
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image} 
                            /> 
                        ); 
                    } 
                    return null; // Return null for items that don't match 
                })} 
            </div> 
        </div> 
    ); 
}
