import React from 'react'
import "./NoPageFound.css"
import { Link } from 'react-router-dom';

const NoPageFound = () => {

  return (
    <div className="no-page-container">
      <h1>404!</h1>
      <p>Sorry, the page you're looking for cannot be found.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
}

export default NoPageFound;

 


