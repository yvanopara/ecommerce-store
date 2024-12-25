import React, { useContext } from 'react'
import './verify.css'
import { useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
export default function Verify() {

    const [searchParams, setSearchParams] = useSearchParams();
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);

    
  return (
    <div className='verify'>
    <div className='spinner'></div>
        
        <h1>Verify</h1>
        

      
    </div>
  )
}
