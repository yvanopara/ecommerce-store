import React, { useState, useEffect } from 'react';
import './home.css';
import Header from '../../components/header/Header';
import ExploreMenu from '../../components/exploreMenu/ExploreMenu';
import FoodDisplay from '../../components/foodDisplay/FoodDisplay';

export default function Home() {
  const [category, setCategory] = useState('All');
  const [showButton, setShowButton] = useState(false); // State to control button visibility

  // Function to scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Handle scroll event to show/hide button
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true); // Show button if scrolled more than 300px
    } else {
      setShowButton(false); // Hide button when near the top
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className='slidesContainer'>
        <Header />
      </div>

      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />

      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top-btn ${showButton ? 'show' : ''}`}
        onClick={scrollToTop}
      >
        ↑
      </button>
    </div>
  );
}
