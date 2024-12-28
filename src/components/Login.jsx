import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./Login.css"

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formData = {
    email,
    password,
  };
  const url = "http://localhost:4011/user/login";

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    // above line cause to prevent button default nehaviour whihc is submititing the form
    try {
      const response = await axios.post(url, formData);
      console.log(response);
      if (response.data.message === "Logged in successfully!") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        props.setLoggedIn(true)
        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (response.data.message === "All credentials Required!") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
      toast.error("Server error");

      }
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="register">
        <form>
          <input
            placeholder="Enter Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={handleLogin}>Submit</button>
          <div className="forgotpass">
             <Link to="/user/forgotpass">Forgot Password?</Link>     
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
