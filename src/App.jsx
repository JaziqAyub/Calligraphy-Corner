import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/sharedComponent/Navbar";
import Home from "./components/pages/Home";
import Footer from "./components/sharedComponent/Footer";
import "./global.css";
import { Route, Routes } from "react-router-dom";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Register from "./components/pages/Register";
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
import LandingPage from "./components/pages/LandingPage";

const App = () => {
  const message =
    "Welcome to Calligraphy Corner! Dive into our exquisite collection of handcrafted calligraphy, thoughtfully designed to bring joy and inspiration to you.";
  const happy = "Let the beauty of words inspire your space.";

  const { fetchData, loading, fetchItem } = useContext(ContextJ);

  useEffect(() => {
    fetchData();
    fetchItem();
  }, [loading, fetchData, fetchItem]);

  // Show Landing Page only once
  const [showLanding, setShowLanding] = useState(() => {
    return localStorage.getItem("landingShown") ? false : true;
  });

  const handleCloseLanding = () => {
    localStorage.setItem("landingShown", "true");
    setShowLanding(false);
  };

  return (
    <>
      {showLanding ? (
        <LandingPage onClose={handleCloseLanding} />
      ) : (
        <>
          <Navbar />
          <div className="main">
            <Routes>
              <Route path="*" element={<NoPageFound />} />
              <Route path="/" element={<Home message={message} happy={happy} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/forgotpass" element={<ForgotPass />} />
              <Route path="/user/resetPass/:userId" element={<ResetPass />} />

              <Route path="/user/delete/:userId" element={<DeleteUser />} />
              <Route path="/user/secureprofile" element={<SecureProfile />} />

              <Route path="/admin/profile" element={<UserProfile />} />
              <Route path="/adminshop" element={<Shop />} />
              <Route path="/usershop" element={<UserShop />} />
              <Route path="/admin/upload" element={<UploadItemPic />} />
              <Route path="/item/description/:id" element={<Description />} />

              <Route path="/order/payment/:id" element={<OrderPayment />} />
              <Route path="/payment/:orderId" element={<PaymentMethod />} />
            </Routes>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
