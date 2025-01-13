import React, { useContext, useEffect } from 'react'
import './placeOrder.css'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

export default function PlaceOrder() {

  const { getTotalCartAmount, token, food_list,cartItems, url  } = useContext(StoreContext);

  const [ data, setData ] = React.useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    street:"",
    country:""
  })

  const onChangeHandlert = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData({...data, [name]:value})
  }  
  useEffect(() => {
    console.log(data)
  }, [data])

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]> 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
        

      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount(), 
    }
    let response = await axios.post("https://landry-store.onrender.com/api/order/place", orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;

      // Send a notification message via the backend
      await axios.post("https://landry-store.onrender.com/api/twilio/notify", {
        message: `le client appeler *${data.firstName} ${data.lastName}* vient de passer un commade a valeur total de *${getTotalCartAmount()} FCFA* Numero de telephone ${data.phone}, quartier *${data.country}.* `,
      });

      console.log(response.data.session_url)
      window.location.replace(session_url);
    }
    else{ 
      alert("Something went wrong");
      console.log(response.data);

    }







  }
  const navigate = useNavigate();
    
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    }
    else if(getTotalCartAmount() === 0){
      navigate('/');
    }
   
    
  }, [token]);
    

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multy-fields'>
          <input required type='text' name="firstName" onChange={onChangeHandlert} value={data.firstName} placeholder='Nom' />
          <input required type='text' name="lastName" onChange={onChangeHandlert} value={data.lastName} placeholder='Prenom' />

        </div>
        <input  type='email' name="email" onChange={onChangeHandlert} value={data.email}  placeholder='Email address' />
        <input required type='text' name="street" onChange={onChangeHandlert} value={data.street} placeholder='Quartier' />


        <div className='multy-fields'>
          
          <input required type='text' name="country" onChange={onChangeHandlert} value={data.country} placeholder='Ville' />
        </div>
        <input required type='number' name="phone" onChange={onChangeHandlert} value={data.phone} placeholder='Numero de Telephone' />
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2 style={{ margin: '0px', padding: '0px' }}>Cart Totals</h2>
          <div >
            <div className='cart-total-details'>
              <p>Sous total </p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <div className='cart-total-details'>
              <p>Frais</p>
              <p>{getTotalCartAmount() === 0 ? 0:1000}</p>
            </div><br></br>
            <div className='cart-total-details'>
              <b>Total&#160;&#160;&#160;</b>
              <b> {getTotalCartAmount() === 0 ? 0: getTotalCartAmount()+1000} FCFA</b>

            </div>
            <hr />


          </div>
          <button type='submit'>PLACEZ VOTRE COMMANDE</button>

        </div>


      </div>
    </form>
  )
}
