import React, { useState } from "react";
import "./CSS/LoginSignUp.css";

const LoginSignUp = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const toggleLoginSignup = () => {
    state === "Login" ? setState("Sign Up") : setState("Login")
  };

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})  
  }

  const login = async () => {
    let responseData, response;
    try {
       response = await fetch(`${REACT_APP_API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      /* if (!response.ok) {
        throw new Error("Failed to login");
      } */
        if (!response.ok) {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || "Unknown error occurred"}`);
          return;
        }
      responseData = await response.json();

      //return responseData; /////
      if(responseData.success) {  
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert("Error: ", responseData.error);
      }
    } catch(err) {
      console.log(err)
  }; 

  /* if(responseData.success) {
    localStorage.setItem("auth-token", responseData.token);
    window.location.replace("/");
  } else {
    alert(responseData.error);
  } */
  };

  const signup = async () => {
    let responseData;
    try {
    const response = await fetch(`${REACT_APP_API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
      if (response.ok) {
        responseData = await response.json();
        return responseData;
      }
    } catch(err) {
      console.log(err.message)
    }
     if( responseData.success ) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };

  return (
    <div className="login-signup">
      <div className="loginsignup-container">
        <h1>{state === "Login" ? "Login" : "Sign Up"}</h1>
        <form className="loginsignup-fields">
          {state === "Sign Up" ? 
            <input type="text" 
                   placeholder="Your Name" 
                   name="username" 
                   onChange={(e) => changeHandler(e)}
                   value={formData.username}
                   autoComplete="username"/> : ""
          }
          <input type="email" 
                 placeholder="Email Address" 
                 name="email" 
                 onChange={(e) => changeHandler(e)}
                 value={formData.email}
                 autoComplete="email"/>
          <input type="password" 
                 placeholder="Password" 
                 name="password" 
                 onChange={(e) => changeHandler(e)}
                 value={formData.password}
                 autoComplete="current-password"/>
        </form>
        <button onClick={()=>{state ==="Login"? login() : signup()}}>Continue</button>
        {state === "Sign Up" ? 
         <p className="loginsignup-login">
           Already have an account? <span onClick={toggleLoginSignup}>Login here</span>
         </p> :
         <p className="loginsignup-login">
          Create an account? <span onClick={toggleLoginSignup}>Click here</span>
         </p>        
        }
       
        
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
};

export default LoginSignUp;
