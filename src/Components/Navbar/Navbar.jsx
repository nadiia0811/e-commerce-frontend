import { useContext, useRef, useState } from 'react';
import "./Navbar.css";
import logo from "../Assets/logo.png";
import nav_dropdown from '../Assets/dropdown.png';
import cart_icon from "../Assets/cart_icon.png";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {

  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
     menuRef.current.classList.toggle("nav-menu-visible");
     menuRef.current.classList.toggle("nav-menu");
     e.target.classList.toggle("open");
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p> Elegance </p>
      </div>
      <img src={nav_dropdown} alt="" 
               onClick={dropdown_toggle}
               className='nav-dropdown'/>
       <ul className="nav-menu" ref={menuRef}>
         <li onClick = {() => setMenu("shop")}><Link to="/" style={{textDecoration: "none"}}>SHOP </Link>{menu === "shop"? <hr/> : <></>}</li>
         <li onClick = {() => setMenu("mens")}><Link to="/mens" style={{textDecoration: "none"}}>MEN</Link> {menu === "mens"? <hr/> : ""}</li>
         <li onClick = {() => setMenu("womens")}><Link to="/womens" style={{textDecoration: "none"}}>WOMEN</Link>{menu === "womens"? <hr/> : ""}</li>
         <li onClick = {() => setMenu("kids")}><Link to="/kids" style={{textDecoration: "none"}}>KIDS</Link>{menu === "kids"? <hr/> : ""}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')? 
          <button onClick={logout}>Log Out</button> : 
          <Link to="/login"><button>Login</button></Link> }

        
        <Link to="/cart"><img src={cart_icon} alt="Cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div> 
    </div>
  )
}

export default Navbar;

