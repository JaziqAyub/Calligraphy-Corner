import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = ({ onClose }) => {
  return (
    <div className="landing-container">
      <button className="close-btn" onClick={onClose}>❌</button>
      <h1>Welcome To Calligraphy Corner!</h1>
      <div className="landRegister">
        <Link to="/user/register" onClick={onClose}>
          <button>Register</button>
        </Link>
      </div>
      <div className="landLogin">
        <Link to="/user/login" onClick={onClose}>
          <button>Login</button>
        </Link>
      </div>
      <div className="website">
        <Link to="/" onClick={onClose}>
          <button>Go The Website</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

