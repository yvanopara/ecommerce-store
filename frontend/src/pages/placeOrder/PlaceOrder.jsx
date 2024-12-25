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
    let response = await axios.post(url+"/api/order/place", orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
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
          <input required type='text' name="firstName" onChange={onChangeHandlert} value={data.firstName} placeholder='first-name' />
          <input required type='text' name="lastName" onChange={onChangeHandlert} value={data.lastName} placeholder='last-name' />

        </div>
        <input required type='email' name="email" onChange={onChangeHandlert} value={data.email}  placeholder='Email address' />
        <input required type='text' name="street" onChange={onChangeHandlert} value={data.street} placeholder='street' />


        <div className='multy-fields'>
          <input  type='text' name="zipecode" onChange={onChangeHandlert} value={data.zipcode} placeholder='Zip code' />
          <input required type='text' name="country" onChange={onChangeHandlert} value={data.country} placeholder='Country' />
        </div>
        <input required type='text' name="phone" onChange={onChangeHandlert} value={data.phone} placeholder='Phone' />
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2 style={{ margin: '0px', padding: '0px' }}>Cart Totals</h2>
          <div >
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount}FCFA</p>
            </div>
            <div className='cart-total-details'>
              <p>Delivery fess</p>
              <p>{getTotalCartAmount() === 0 ? 0:2}</p>
            </div>
            <div className='cart-total-details'>
              <b>Total</b>
              <b> {getTotalCartAmount() === 0 ? 0: getTotalCartAmount()+2}FCFA</b>

            </div>
            <hr />


          </div>
          <button type='submit'>PROCEED TO PAY</button>

        </div>


      </div>
    </form>
  )
}
