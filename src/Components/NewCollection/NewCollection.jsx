import React, { useState, useEffect } from 'react';
import Item from '../Item/Item';
import './NewCollection.css';

const NewCollection = ({collectionRef}) => {

  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    const getNewCollection = async () => {
      try {
        await fetch("http://localhost:4000/newcollection")
        .then(res => res.json())
        .then(data => setNewCollection(data))
          } catch(err) {
            console.log("Error :" + err)
          }
      }

      getNewCollection();
  }, []);

    
  return (
    <div className='new-collections'>
       <h1 ref={collectionRef}>NEW COLLECTION</h1>
       <hr />
       <div className="collections">
         {newCollection.map((item, index) => {
           return <Item key={index} 
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price} />
         })}
       </div>
    </div>
  )
}

export default NewCollection;