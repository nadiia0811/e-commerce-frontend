import React, { useContext, useState } from 'react';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import './CSS/ShopCategory.css';

const ShopCategory = ({category, banner}) => { 

  const REACT_APP_API_BASE_URL= process.env.REACT_APP_API_BASE_URL;
  const {allProducts} = useContext(ShopContext);
  const [catSort, setCatSort] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = allProducts.filter((item) => item.category === category);
  const count = <span>{`1 - ${visibleCount}`}</span>;

   const sort = async () => {
    try {
      await fetch(`${REACT_APP_API_BASE_URL}/sort`, {
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

  const handleExploreMore = () => {
    const scrollPosition = window.scrollY; 
    setVisibleCount(prev => prev + 4);
    setTimeout(() => {
      window.scrollTo(0, scrollPosition); 
    }, 0);
  }

  return (
    <div className="shop-category">
      <img className = "shopcategory-banner" src={banner} alt="" /> 
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing {count} </span> out of 12 products
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

          ( filtered.slice(0, visibleCount)
                    .map((item, index) =>  <Item key = {index}
                                                 id={item.id}
                                                 name={item.name}
                                                 image={item.image}
                                                 new_price={item.new_price}
                                                 old_price={item.old_price} />) )

        } 
    
      </div>
      {visibleCount < filtered.length && <div className="shopcategory-loadmore"
                                              onClick={handleExploreMore}>Explore More
                                         </div>}
    </div>
  )
};

export default ShopCategory;
