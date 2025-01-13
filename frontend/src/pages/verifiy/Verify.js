import React, { useContext, useEffect, useState } from 'react'
import './verify.css'
import { useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';


export default function Verify() {

    const [searchParams, setSearchParams] = useSearchParams();
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);

    const [showFirstDiv, setShowFirstDiv] = useState(true); // Control the first div
    const [showSecondDiv, setShowSecondDiv] = useState(false); // Control the second div

    useEffect(() => {
      // Wait for 5 seconds after the component mounts
      const timer = setTimeout(() => {
        setShowFirstDiv(false); // Hide the first div
        setShowSecondDiv(true); // Show the second div
      }, 3000); // 5000 milliseconds = 5 seconds
  
      return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
    }, []);


  return (
    <div>
      {showFirstDiv && 
      <div className='verify'>
      <div className='spinner'></div>
      
    </div>}
      {showSecondDiv &&
        <div className='tick'>
          <img src={assets.tick} />
          {/* LAVIE */}
          
        </div>}
    </div>
  );
}

