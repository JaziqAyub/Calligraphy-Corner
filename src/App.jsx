import React, { useContext, useEffect } from "react";
import Navbar from "./components/sharedComponent/Navbar";
import Home from "./components/pages/Home";
import Footer from "./components/sharedComponent/Footer";
import "./global.css";
import { Route, Routes } from "react-router-dom";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Register from "./components/pages/Register";
// import axios from "axios";
import Login from "./components/pages/Login";
import ForgotPass from "./components/pages/ForgotPass";
import ResetPass from "./components/pages/ResetPass";
import NoPageFound from "./components/pages/NoPageFound";
import { DeleteUser } from "./components/pages/DeleteUser";
import { SecureProfile } from "./components/pages/SecureProfile";
import { ContextJ } from "./context/Store";
import UserProfile from "./components/pages/AdminProfile";
import Shop from "./components/pages/Shop";
import UploadItemPic from "./components/molecules/UploadItemPic";
import OrderPayment from "./components/pages/OrderPayment";
import PaymentMethod from "./components/pages/PaymentMethod";
import UserShop from "./components/pages/UserShop";
import Description from "./components/pages/Description";

const App = () => {
  const message =
    "Welcome to Calligraphy Corner! Dive into our exquisite collection of handcrafted calligraphy, thoughtfully designed to bring joy and inspiration to you,";
  const happy = "Let the beauty of words inspire your space.";

  // const [username, setUsername] = useState("");
  // const userId = localStorage.getItem("userId")
  // const [loggedIn, setLoggedIn] = useState(false)

  const { fetchData, loading, fetchItem } = useContext(ContextJ);
  // const userId = localStorage.getItem("userId");

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
    fetchData();
    fetchItem();
  }, [loading, fetchData, fetchItem]);

  return (
    <>
      <Navbar />
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
          <Route path="/user/forgotpass" element={<ForgotPass />} />
          <Route path="/user/resetPass/:userId" element={<ResetPass />} />

          {/* secureRoutes  */}
          <Route path="/user/delete/:userId" element={<DeleteUser />} />
          <Route path="/user/secureprofile" element={<SecureProfile />} />

          {/* frontend  */}
            <Route path = "/admin/profile" element= {<UserProfile/>}/>
            <Route path = "/adminshop" element= {<Shop/>}/>
            <Route path = "/usershop" element= {<UserShop/>}/>
            <Route path = "/admin/upload" element= {<UploadItemPic/>}/>
            <Route path = "/item/description/:id" element= {<Description/>}/>
            
            {/* paymentRoute */}
            <Route path = "/order/payment/:id" element= {<OrderPayment/>}/>
            <Route path = "/payment/:orderId" element= {<PaymentMethod/>}/>
        </Routes>
      </div>

      <Footer />
    </>
  );
};
export default App;
