import React from "react";
import "./Footer.css";
import insta from "../../assets/Insta.jpeg"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerHeading">
        <h1>Calligraphy Corner.</h1>
      </div>
      <div className="footerGrid">
        <div className="gridPara">
          <p>
          Where words become art, every stroke tells a story, and creativity finds its voice in timeless elegance. Let us add a touch of elegance to your special moments.
          <div>
          <img src={insta} alt="igLogo" />
          </div>
        
          </p>
        </div>
        <div className="gridCol1">
          <ul>
            <li>About us</li>
            <li>Services</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="gridCol2">
          <ul>
            <li>Support</li>
            <li>Knowledege base</li>
            <li>Live Chat</li>
          </ul>
        </div>
        <div className="gridCol3">
          <ul>
            <li>Jobs</li>
            <li>Our team</li>
            <li>Leadership</li>
          </ul>
        </div>
        <div className="gridCol4">
          <ul>
            <li>Big Canvases</li>
            <li>Small Canvases</li>
            <li>Birthday Calendars</li>
          </ul>

        </div>

      </div>
      <hr style={{"marginTop":"50px", "width":"82%", "marginLeft":"145px"}}/>
      <div className="footerOutro">
      
        <div className="outroHeading">

          Copyright © 2025 - All rights reserved.
        </div>
        <div className="outroTerms">
          <span>Terms & Conditions </span>
          <span> Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
