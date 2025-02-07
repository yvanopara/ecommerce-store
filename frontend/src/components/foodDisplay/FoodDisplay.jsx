import React, { useContext, useState, useEffect } from 'react';
import './foodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../foodItem/FoodItem';

export default function FoodDisplay({ category }) {
    const { food_list, showPlusCategory } = useContext(StoreContext);
    const [shuffledFoodList, setShuffledFoodList] = useState([]);

    // Shuffle the food list only when the component mounts
    useEffect(() => {
        const shuffled = [...food_list].sort(() => Math.random() - 0.5);
        setShuffledFoodList(shuffled);
    }, [food_list]); // Runs only when food_list changes (not on cart updates)

    return (
        <div className='food-display' id='food-display'>
            <p className='header1'>VOS ACHATS AU MEILLEUR PRIX</p>

            <div className="food-display-list">
                {shuffledFoodList.map((item) => {
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
