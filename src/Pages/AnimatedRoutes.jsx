import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import Shop from './Shop';
import ShopCategory from './ShopCategory';
import Product from './Product';
import Cart from './Cart';
import LoginSignUp from './LoginSignUp';
import women_banner from '../Components/Assets/banner_women.png';
import men_banner from '../Components/Assets/banner_mens.png';
import kid_banner from '../Components/Assets/banner_kids.png';



const AnimatedRoutes = () => {

  const location = useLocation();

  const transitions = useTransition(location, {   
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },   
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

   return ( 
    <>
      {transitions((style, item) => (
        <animated.div style={style}>
          <Routes location={item}>
            <Route path="/" element={<Shop />} /> 
            <Route path="/mens" element={<ShopCategory category="man" banner={men_banner} />} />
            <Route path="/womens" element={<ShopCategory category="woman" banner={women_banner} />} />
            <Route path="/kids" element={<ShopCategory category="kid" banner={kid_banner} />} />           
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignUp />} />
          </Routes>
        </animated.div>
      ))}
    </>
  );
};

export default AnimatedRoutes;