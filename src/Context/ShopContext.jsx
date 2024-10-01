import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
   let cart = {};
      for(let i = 1; i <= 36; i++){
      cart[i] = 0;
   }
   return cart;
}

const ShopContextProvider = (props) => {
   const API_BASE_URL=process.env.API_BASE_URL;
   const[cartItems, setCartItems] = useState(getDefaultCart());
   const [allProducts, setAllProducts] = useState([]);

     useEffect(() => { 

      if(localStorage.getItem("auth-token")) {
         fetch(`${API_BASE_URL}/getcart`, {
            method: 'POST',
            headers : {
               Accept: "application/json",
               "auth-token": `${localStorage.getItem("auth-token")}`,
               "Content-Type": "application/json",
               },
            body: ""
         })
         .then(res => res.json())
         .then(data => setCartItems(data))             
      }

      const fetchData = async () => {
        try {
         await fetch("http://localhost:4000/allproducts")
                   .then(res => res.json())
                   .then(data => setAllProducts(data))     
        } catch(err) {
         console.log(err);
        }     
       } 
    fetchData();   
   }, []);


   const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}));
    if(localStorage.getItem("auth-token")) {
      try {
         fetch("http://localhost:4000/addtocart", {
            method: 'POST',
            headers : {
               Accept: "application/json",
               "auth-token": `${localStorage.getItem("auth-token")}`,
               "Content-Type": "application/json",
               },
            body: JSON.stringify({"itemId": itemId})
          })
          .then(res => res.json())
          .then(data => console.log(data))
      } catch(err){
         console.log("Error: " + err)
      }   
    }
   }

   const removeFromCart = (itemId) => {
      setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}));
      if(localStorage.getItem("auth-token")) {
         try {
            fetch("http://localhost:4000/removefromcart" , {
               method:'POST',
               headers: {
                  Accept:"application/json",
                  "auth-token": `${localStorage.getItem("auth-token")}`,
                  'Content-Type': "application/json"
               }, 
               body: JSON.stringify({"itemId": itemId})
            })
            .then(res => res.json()
            .then(data => console.log(data))
         )
         } catch(err) {
            console.log("Error: " + err)
         }
      }    
   };


   const getTotalCartAmount = () => {
     let totalAmount = 0;
     for(const item in cartItems) {
       if(cartItems[item] > 0) {
         let itemInfo = allProducts.find((product) => product.id === Number (item));
         totalAmount += itemInfo.new_price * cartItems[item];
       }
     }
     return totalAmount;
   }

   const getTotalCartItems = () => {
      let totalItem = 0;
      for(const item in cartItems) {
         if(cartItems[item] > 0) {
            totalItem += cartItems[item];
         }
      }
      return totalItem;
   }
 
   const contextValue = {allProducts, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};  

   return <ShopContext.Provider value = {contextValue} >
             {props.children}
          </ShopContext.Provider >
};

export default ShopContextProvider;