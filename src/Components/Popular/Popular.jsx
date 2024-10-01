import { useState, useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const getPopular = async () => {
      try {
        await fetch("http://localhost:4000/popular")
        .then(res => res.json())
        .then(data => setPopularProducts(data))
      } catch(err){
        console.log("Error: " + err)
      }     
    };
    getPopular();
  }, []);


  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, index)=>{
            return <Item key={index} 
                         id={item.id}
                         name={item.name}
                         image={item.image}
                         new_price={item.new_price}
                         old_price={item.old_price}/>
        })}
      </div>
        
    </div>
  )
}

export default Popular;