import React, { useState } from 'react'
import './login.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import OAuth from '../google/OAuth'

export default function Login({setShowLoginPopup}) {
    const [currentState, setCurrentState] = useState('Se Connecter')
    const {url,setToken} = useContext(StoreContext)
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
        if (currentState === 'Se Connecter') {
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
                {currentState==='Se Connecter'?<></>: <input name='name' type='text' placeholder='Nom' onChange={onChangeHandler} value={data.name} required/>}
                
                <input name='email' type='text' placeholder='Email ex: kmystore@gmail.com' onChange={onChangeHandler} value={data.email} required/>
                <input name='password' type='text' placeholder='Mot de passe' onChange={onChangeHandler} value={data.password} required/>

            </div>
            <button type='submit'>{currentState==='Se Connecter'?'Se Connecter': 'Creez un Compte'}</button>
            <OAuth/>
            
            <div className='login-popup-condition'> 
                <input type='checkbox' required/>
                <p>I agree to the Terms & Conditions of <span>privacy policy</span></p>
            </div>
            {currentState==='Se Connecter'
            ?<p>Vous navez pas de comptes? <span onClick={()=> setCurrentState('Creez un Compte')}>creez un compte</span></p>
            :<p>Vous avez deja un compte? <span onClick={()=> setCurrentState('Se Connecter')}>Se Connecter</span></p>
            }
         
        </form>     
    </div>
  )
}
