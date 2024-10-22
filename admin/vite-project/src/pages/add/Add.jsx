import React, { useState } from 'react'
import './add.css'
import { assets } from '../../assets/assets'

export default function Add() {
  const [image, setImage] = useState(false);
  return (
    <div className='add'>
      <form className='flex-col'>
        <div className="add-img-upload flex-col">

          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
        </div>

        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input type="text" name="name"  placeholder='Type here' />

        </div>
        <p>Product Description</p>
        <div className='add-product-description flex-col'>
          <textarea name='description' rows='6' placeholder='write content here'required></textarea>
        </div>

        <div className='add-category-price'>
          
          <div  className='add-category flex-col'>
          <p>Product Category</p>
            <select name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>

            </select>
          </div>

          <div className=''>
            <p>Product Price</p>
            <input type="number" name="price" placeholder='500FCFA' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>

      </form>
    </div>
  )
}
