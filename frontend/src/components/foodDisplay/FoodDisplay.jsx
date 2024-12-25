import React, { useContext } from 'react'; 
import './foodDisplay.css'; 
import { StoreContext } from '../../context/StoreContext'; 
import FoodItem from '../foodItem/FoodItem'; 

export default function FoodDisplay({ category }) { 
    const { food_list } = useContext(StoreContext); 

    return ( 
        <div className='food-display' id='food-display'> 
            <h2>To dishes near you</h2> 
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
