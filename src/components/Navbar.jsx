import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = (props) => {
  const username = props.user;

  const [showSideNav, setShowSideNav] = useState(false);

  function handleNav() {
    setShowSideNav(!showSideNav);
  }

  return (
    <div className="navbar">
     
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/user/login">Login</Link>
        </li>
        <li>
          <Link to="/user/register">Register</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

        

      <div className="menubar" onClick={handleNav}>
 
      <GiHamburgerMenu />
    
        {showSideNav
         &&
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user/login">Login</Link>
            </li>
            <li>
              <Link to="/user/register">Register</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>}
      </div>

   

      <div className="login-container">
        {username ? (
          `Welcome ${username}`
        ) : (
          <button className="login-button">
          <Link to="/user/login">Login</Link>{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
