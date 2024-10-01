import React, { useContext, useRef } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ({product}) => {

  const {addToCart} = useContext(ShopContext);
  const divContainerRef = useRef(null);

  const addSize = (e) => {
    const divs = divContainerRef.current?.querySelectorAll("div");
    divs.forEach((div) => {
      div.classList.remove("selected");  
      console.log("removed")   
    })
    e.target.classList.add("selected"); 
    console.log("added")   
  };
  

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-image">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">Lightweight, loose-fitting garment for women, 
                                                          covering the body from the neck or shoulders more or less to 
                                                          the waistline, with or without a collar and sleeves, worn inside 
                                                          or outside a skirt, slacks.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes" 
               ref = {divContainerRef} 
               onClick={(e) => addSize(e)}>
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category : </span> Women, T-shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags : </span >Modern, Latest
        </p>
      </div>
    </div>
  )
}

export default ProductDisplay;