import React, { useState, useContext } from 'react';
import './exploreMenu.css';
import { menu_list } from '../../assets/assets';
import '@fontsource/rowdies/700.css'; // Light
import '@fontsource/signika-negative/600.css'; // Semi-Bold
import { StoreContext } from '../../context/StoreContext'; // Import context

// Simple Modal Component
const Modal = ({ show, closeModal, togglePlusCategory }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Espace réservé! </h2>
        <p>Cette page est réservée uniquement aux Adultes. Veuillez fermer la page si vous êtes mineur</p>
        <button 
          className="left-button"
          onClick={() => {
            togglePlusCategory(); // Toggle the showPlusCategory when the button is clicked
            closeModal(); // Close the modal
          }}
        >
          J'ai +22
        </button>
        <button 
          className="right-button"
          onClick={closeModal}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default function ExploreMenu({ category, setCategory }) {
  const { showPlusCategory, setShowPlusCategory } = useContext(StoreContext);
  
  // New state for managing modal visibility
  const [showModal, setShowModal] = useState(false);

  const handleCategoryClick = (item) => {
    if (item.menu_name === 'Plus') {
      setCategory('Plus'); // Set 'Plus' as active category
      setShowModal(true); // Show modal when 'Plus' is selected
    } else {
      setCategory(prev => {
        // If the selected category is 'Plus', toggle showPlusCategory
        if (prev === 'Plus') {
          setShowPlusCategory(false); // Hide 'Plus' if it's deselected
        }
        return prev === item.menu_name ? 'All' : item.menu_name;
      });
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal without changing the active category
  };

  const togglePlusCategory = () => {
    setShowPlusCategory(true); // Force showPlusCategory to be true
    localStorage.setItem('showPlusCategory', JSON.stringify(true)); // Persist the value in localStorage
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explorez Les Différentes Catégories</h1>

      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          if (item.category !== 'Plus' || showPlusCategory) {
            return (
              <div
                onClick={() => handleCategoryClick(item)} // Use new click handler
                key={index}
                className='explore-menu-list-item'
              >
                <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt='' />
                <p>{item.menu_name || 'empty'}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
      
      {/* Modal for 'Plus' category */}
      <Modal show={showModal} closeModal={closeModal} togglePlusCategory={togglePlusCategory} />

      <hr />
    </div>
  );
}
