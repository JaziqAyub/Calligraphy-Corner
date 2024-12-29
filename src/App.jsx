import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
// import axios from "axios";
import Login from "./components/Login";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";
import NoPageFound from "./components/NoPageFound";
import { DeleteUser } from "./components/DeleteUser";
import { SecureProfile } from "./components/SecureProfile";
import { ContextJ } from "./context/Actions";

const App = () => {
  const message =
    "Welcome to Calligraphy Corner! Dive into our exquisite collection of handcrafted calligraphy, thoughtfully designed to bring joy and inspiration to you,";
  const happy = "Let the beauty of words inspire your space.";

  // const [username, setUsername] = useState("");
  // const userId = localStorage.getItem("userId")
  // const [loggedIn, setLoggedIn] = useState(false)


  const {fetchData, userId, loading} = useContext(ContextJ)
  // getUser of  backend 
  //   const fetchData = async (userId) => {
  //   if (!userId) return;
  //   try {
  //     const url = `http://localhost:4011/getUser/${userId}`;
  //     const response = await axios.get(url);
  //     console.log(response);
  //     setUsername(response.data.payload.username);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
      if(loading){
      fetchData(userId);
      } 
  }, [userId, loading, fetchData]);
  

  return (
    <BrowserRouter>
      <Navbar/>
      <div className="main">
        <Routes>
          {/* guestRoutes  */}
          <Route path="*" element={<NoPageFound />} />
          <Route path="/" element={<Home message={message} happy={happy} />} />
          {/* <Route path="/" element={<Home message={message} happy={happy} user = {username}/>} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/forgotpass" element={<ForgotPass/>} />
          <Route path="/user/resetPass/:userId" element={<ResetPass/>} />

          {/* secureRoutes  */}
          <Route path="/user/delete/:userId" element={<DeleteUser/>} />
          <Route path="/user/secureprofile" element={<SecureProfile/>} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
};
export default App;
