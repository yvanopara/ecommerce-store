import React, { useContext, useState, useEffect } from 'react';
import './foodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../foodItem/FoodItem';
// import '@fontsource/lilita-one'; // Defaults to weight 400
import '@fontsource/rowdies/700.css'; // Light
// import '@fontsource/rowdies/400.css'; // Regular
// import '@fontsource/rowdies/700.css'; // Bold

export default function FoodDisplay({ category }) {
    const { food_list } = useContext(StoreContext);
    const [shuffledFoodList, setShuffledFoodList] = useState([]);

    // Function to shuffle the array using the Fisher-Yates algorithm
    const shuffleArray = (array) => {
        let shuffledArray = [...array]; // Create a copy of the array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
        }
        return shuffledArray;
    };

    // Shuffle the food list only once when the component mounts
    useEffect(() => {
        setShuffledFoodList(shuffleArray(food_list));
    }, [food_list]); // Only re-shuffle if food_list changes

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
