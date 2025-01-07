import React, { useContext, useState } from "react";
import "./Register.css";
// import axios from "axios";
import { ToastContainer } from "react-toastify";
import { ContextJ } from "../../context/Store";
// import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const {handleRegister} = useContext(ContextJ)

  const formData = {
    username,
    email,
    password,
  };
  // const url = "http://localhost:4011/user/register";
  // const navigate = useNavigate();
  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   // above line cause to prevent button default nehaviour whihc is submititing the form
  //   try {
  //     const response = await axios.post(url, formData);
  //     if (response.data.message === "User created succesfully!") {
  //       toast.success(response.data.message);
  //       setTimeout(() => {
  //         navigate("/user/login");
  //       }, 3000);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     if (error.response.status === 400) {
  //       toast.error(error.response.data.message);
  //     } else {  
  //     toast.error("Server error");

  //     }

  //     console.error(error);
  //   }
  // };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="register">
        <form>
          <input
            placeholder="Enter Username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
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

          <button onClick={(e)=>{handleRegister(e,formData)}}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
