import React, { useState } from 'react'
import './login.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

export default function Login({setShowLoginPopup}) {
    const [currentState, setCurrentState] = useState('Login')
    const {url,token,setToken} = useContext(StoreContext)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}));
    }
    useEffect(() => {
        console.log(data)
    },[data])

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currentState === 'Login') {
            newUrl = url + '/api/user/login'
        
        }else{
            newUrl = url + '/api/user/register'
        }
        const response = await axios.post(newUrl,data);
        
    
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token);
            setShowLoginPopup(false)
           
    }
    else{
        alert(response.data.message)
        
    }
}

  return (
    <div className='login'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currentState}</h2>
                <img onClick={() => setShowLoginPopup(false)} src={assets.cross_icon} alt=''/>
            </div>
            <div className='login-popup-inputs'>
                {currentState==='Login'?<></>: <input name='name' type='text' placeholder='name' onChange={onChangeHandler} value={data.name} required/>}
                
                <input name='email' type='text' placeholder='Your Email' onChange={onChangeHandler} value={data.email} required/>
                <input name='password' type='text' placeholder='Password' onChange={onChangeHandler} value={data.password} required/>

            </div>
            <button type='submit'>{currentState==='Sign Up'?'Create Account': 'Login'}</button>
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
