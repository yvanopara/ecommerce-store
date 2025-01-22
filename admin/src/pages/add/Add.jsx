import React, { useEffect, useState } from 'react'
import './add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Add({url}) {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Brume",  // default value that appears on the page
    image: "", 
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
  }

  const onSubmitHandler =async (event) => {
    event.preventDefault();
    const formData =new FormData();
    formData.append('name',data.name)
    formData.append('description',data.description)
    formData.append('category',data.category)
    formData.append('price',Number(data.price))
    formData.append('image',image)
    const response =await axios.post(`${url}/api/food/add`,formData)
    if(response.data.success){
      setData({
        name: "",
    price: "",
    description: "",
    category: "Women Bags",  
    image: "",
      })
      setImage(false)
      toast.success(response.data.message)
    } 
    else {
      console.log('mot succeed')
      toast.error(response.data.message)

    }
    
  }
 
  
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">

          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
        </div>

        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name"  placeholder='Type here' />

        </div>
        <p>Product Description</p>
        <div className='add-product-description flex-col'>
          <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='write content here' required></textarea>
        </div>

        <div className='add-category-price'>
          
          <div  className='add-category flex-col'>
          <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category" >
              <option value="Women Bags">Women Bags</option>
              <option value="Women Fassion">Women Fassion</option>
              <option value="Brume">Brume</option>
              <option value="Plus">18+</option>
              <option value="Shisha">shisha</option>
              <option value="Electronics">Electronics</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Others">Others</option>

            </select>
          </div>

          <div className=''>
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='500FCFA' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>

      </form>
    </div>
  )
}
