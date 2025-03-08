import React from 'react'
import'./oauth.css'
import { AiFillGoogleCircle } from "react-icons/ai";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from './firebase';
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import axios from "axios";

export default function OAuth({setShowLoginPopup}) {

  const {url} = useContext(StoreContext)

  const auth =getAuth(app)


  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });


    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const token = await resultsFromGoogle.user.getIdToken(); // Ensure token is valid
      
  

const res = await axios.post("http://localhost:5000/api/user/google", {
    name: resultsFromGoogle.user.displayName,
    email: resultsFromGoogle.user.email,
    token: token,  // Use getIdToken() instead of accessToken
}, {
    headers: {
        "Content-Type": "application/json"
    }
});

    
      const data = await res.json();
      if (res.ok) {
        console.log('jai reussi')
        alert("Réussi");
        // setShowLoginPopup(false);
      }
    } catch (error) {
      console.log("Google Auth Error:", error);
    }
    

  }
  return (
      <div></div>
    // <div  className='google'>
    //     <button type='button' onClick={handleGoogleClick} style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
    // boxShadow: "0px 2px 4px rgba(0,0,0,0.2)"}}> 
    //       <div>
    //         <AiFillGoogleCircle/>
    //       </div>
    //       <div>
    //           Continuez avec Google
    //       </div>
            
          
    //     </button>
      
    // </div>
  )
}
