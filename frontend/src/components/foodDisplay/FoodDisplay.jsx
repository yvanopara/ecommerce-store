import React, { useContext } from 'react';
import './foodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../foodItem/FoodItem';

export default function FoodDisplay({ category }) {
    const { food_list, showPlusCategory, setShowPlusCategory } = useContext(StoreContext);

    return (
        <div className='food-display' id='food-display'>
            <p className='header1'>VOS ACHATS AU MEILLEUR PRIX</p>
            
            {/* Button to toggle the 'Plus' category visibility */}
           

            <div className="food-display-list">
                {food_list.map((item) => {
                    if (
                        (category === 'All' || category === item.category) &&
                        (item.category !== 'Plus' || showPlusCategory)
                    ) {
                        return (
                            <FoodItem
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}