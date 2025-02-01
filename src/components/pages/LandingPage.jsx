import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ({ onClose }) => {
  return (
    <div className="landing-container">
      <button className="close-btn" onClick={onClose}>❌</button>
      <h1>Welcome!</h1>
      <div className="landRegister">
        <Link to="/user/register">
          <button>Register</button>
        </Link>
      </div>
      <div className="landLogin">
        <Link to="/user/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
