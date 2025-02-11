import React, { useContext, useEffect } from 'react'
import './myorders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
export default function MyOrders() {


    const[data, setData] = React.useState([])
    const {url, token} = useContext(StoreContext);

    const fetchOrders = async () => {
        const response =  await axios.post(url+"/api/order/userorders",{}, {headers: {token}})
        setData(response.data.data);
        console.log(response.data.data)
    }

    useEffect(() => {
        if(token){
            fetchOrders();
        }
        
    }, [token])
  return (
    <div className='myorders'>
        <h1>My Orders</h1>
        <div className='container'>
            {data.map((order,index) =>{
                return(
                    <div key={index} className='my-orders-order'>
                        <img  src={assets.parcel_icon} alt="" />
                        <p style={{color:"black"}}>{order.items.map((item,index) =>{
                            if(index === order.items.length-1){
                                return item.name+" x "+item.quantity

                            }
                            else{
                                return item.name+" x "+item.quantity+", "
                            }
                                

                        })}</p>
                        <p>{order.amount} FCFA</p>
                        <p style={{color:"black"}}> Items {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                        
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}
