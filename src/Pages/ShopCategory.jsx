import React, { useContext, useState } from 'react';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import './CSS/ShopCategory.css';

const ShopCategory = ({category, banner}) => { 

  const API_BASE_URL= process.env.API_BASE_URL;
  const {allProducts} = useContext(ShopContext);
  const [catSort, setCatSort] = useState([]);

   const sort = async () => {
    try {
      await fetch(`${API_BASE_URL}/sort`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"category": category})
      })
      .then(res => res.json())
      .then(data => setCatSort(data))
    } catch(err) {
      console.log("Error: " + err)
    }
  }; 

  return (
    <div className='shop-category'>
      <img className = "shopcategory-banner" src={banner} alt="" /> 
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1 - 12</span> out of 36 products
        </p>
        <div className="shopcategory-sort"  onClick={sort}>
          Sort by price <img src={dropdown_icon} alt='Dropdown icon'/>
        </div>
      </div>

      <div className="shopcategory-products">

        {catSort.length > 0 ? (catSort.map((item, i) => {
           return <Item key = {i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price} /> }) ) : 

           (allProducts.map((item, i) => {
           if(category === item.category) { 
              return <Item key = {i}
                           id={item.id}
                           name={item.name}
                           image={item.image}
                           new_price={item.new_price}
                           old_price={item.old_price} />
           } else {
            return null;
           }
        }) )} 
    
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  )
};

export default ShopCategory;
