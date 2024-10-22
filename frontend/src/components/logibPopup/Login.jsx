import React, { useState } from 'react'
import './login.css'
import { assets } from '../../assets/assets'

export default function Login({setShowLoginPopup}) {
    const [currentState, setCurrentState] = useState('Login')
  return (
    <div className='login'>
        <form className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currentState}</h2>
                <img onClick={() => setShowLoginPopup(false)} src={assets.cross_icon} alt=''/>
            </div>
            <div className='login-popup-inputs'>
                {currentState==='Login'?<></>: <input type='text' placeholder='name' required/>}
                
                <input type='text' placeholder='Your Email' required/>
                <input type='text' placeholder='Password' required/>

            </div>
            <button>{currentState==='Sign Up'?'Create Account': 'Login'}</button>
            <div className='login-popup-condition'>
                <input type='checkbox' required/>
                <p>I agree to the Terms & Conditions of <span>privacy policy</span></p>
            </div>
            {currentState==='Login'
            ?<p>Create a new account<span onClick={()=> setCurrentState('Sign Up')}>Click Here</span></p>
            :<p>Already have an account?<span onClick={()=> setCurrentState('Login')}>Login Here</span></p>
            }
            
            
        </form>     
    </div>
  )
}
