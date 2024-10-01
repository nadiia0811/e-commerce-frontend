import React from 'react';
import './Breadcrumb.css';
import arrow_icon from '../Assets/breadcrumb_arrow.png';

const Breadcrumb = ({product}) => {
    
  return (
    <div className='breadcrumb'>
      HOME <img src={arrow_icon} alt=''/> 
      SHOP <img src={arrow_icon} alt=''/> 
      {product.category} <img src={arrow_icon} alt=''/>
      {product.name}
    </div>
  )
}

export default Breadcrumb;