import React, { useState, useEffect } from 'react';
import './order.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

export default function Order({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchApiCall = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('API call failed');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApiCall();
  }, [url]);
const statusHandler = async (event, orderId)=>{
  const response = await axios.post(url+"/api/order/status",{
    orderId,
    status: event.target.value
  })
  if(response.data.success){
      toast.success("Status Updated")
      await fetchApiCall()
    }
    else{
      toast.error("Error Updating Status")
    }
  
}

  return (
    <div className="order add">
      <h1>Order Page</h1>
      <div className="order-list">
        {orders.map((order, orderIndex) => (
          <div key={orderIndex} className="order-item">

            <div className='order-item-details'>
            <img src={assets.parcel_icon} alt="Parcel Icon"/>
              <p className="order-item-food" >
                {order.items?.map((item, index) => {
                  return index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `;
                })}
              </p>
              <p >{order.amount} FCFA</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Deliver</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <div className='order-item-details-user'>

            <p className="order-item-name" > {order.address.firstName + " " + order.address.lastName} </p>
            
            <p className='order-item-address' >{order.address.street + ","+order.address.country}</p>
      
            <p className='order-item-phone'  >{order.address.phone}</p>

            </div>

          </div>

        ))}
      </div>
    </div>
  );
}
