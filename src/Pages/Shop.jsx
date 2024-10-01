import React, {useRef} from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollection from '../Components/NewCollection/NewCollection';
import NewsLetter from '../Components/NewsLetter/NewsLetter';


const Shop = () => {

  const collectionRef = useRef(null);//
  
  const scrollToCollection = () => {
    if (collectionRef.current) {
        collectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div>
        <Hero scrollToCollection={scrollToCollection}/>
        <Popular/>
        <Offers />
        <NewCollection collectionRef = {collectionRef}/>
        <NewsLetter />
    </div>
  )
};

export default Shop;
