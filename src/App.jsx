import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import axios from "axios";
import Login from "./components/Login";

const App = () => {
  const message =
    "Welcome to Calligraphy Corner! Dive into our exquisite collection of handcrafted calligraphy, thoughtfully designed to bring joy and inspiration to you,";
  const happy = "Let the beauty of words inspire your space.";

  const [username, setUsername] = useState("");
  const userId = localStorage.getItem("userId")
  const [loggedIn, setLoggedIn] = useState(false)

  // getUser of  backend 
    const fetchData = async (userId) => {
    if (!userId) return;
    try {
      const url = `http://localhost:4011/getUser/${userId}`;
      const response = await axios.get(url);
      console.log(response);
      setUsername(response.data.payload.username);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
      fetchData(userId);
    
  }, [userId, loggedIn]);
  

  return (
    <BrowserRouter>
      <Navbar user = {username}/>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home message={message} happy={happy} user = {username}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login setLoggedIn = {setLoggedIn} />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
};
export default App;
