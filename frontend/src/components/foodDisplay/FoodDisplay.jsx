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

    // Function to shuffle an array
    const shuffleArray = (array) => {
        return array
            .map((item) => ({ ...item, sortKey: Math.random() }))
            .sort((a, b) => a.sortKey - b.sortKey)
            .map((item) => {
                const { sortKey, ...originalItem } = item; // Remove sortKey
                return originalItem;
            });
    };

    // Shuffle food list on each page load
    const shuffledFoodList = shuffleArray(food_list);

    return (
        <div className='food-display' id='food-display'>
            <p className='header1'>VOS ACHATS AU MEILLEUR PRIX</p>
            <div className="food-display-list">
                {shuffledFoodList.map((item) => {
                    if (category === 'All' || category === item.category) {
                        return (
                            <FoodItem
                                key={item._id} // Use unique key instead of index for better React performance
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
