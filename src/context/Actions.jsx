import { createContext, useState } from "react";
import App from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ContextJ = createContext();
const Actions = () => {
  const baseUrl = "http://localhost:4011";
  const navigate = useNavigate();
  const [store, setStore] = useState({
    loading: false,
    username: "Jay",
    userId: "",
  });

  //login
  const handleLogin = async (e, formData) => {
    e.preventDefault();
    // above line cause to prevent button default nehaviour whihc is submititing the form
    try {
      setStore((prev) => ({ ...prev, loading: true }));
      const url = `${baseUrl}/user/login`;
      const response = await axios.post(url, formData);
      console.log(response);
      if (response.data.message === "Logged in successfully!") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
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
        console.error(error);
      }
    } finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }
  };

  // getUser of  backend
  const fetchData = async (userId) => {
    if (!userId) return;
    try {
      const url = `${baseUrl}getUser/${userId}`;
      const response = await axios.get(url);
      console.log(response);
      setStore((prev) => ({
        ...prev,
        username: response.data.payload.username,
      }));
    } catch (error) {
      console.log(error);
    }
  };

//register
const handleRegister = async (e, formData) => {
    e.preventDefault();
    // above line cause to prevent button default nehaviour whihc is submititing the form
    try {
      const url = `${baseUrl}/user/register`
      const response = await axios.post(url, formData);
      if (response.data.message === "User created succesfully!") {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/user/login");
        }, 3000);
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
    <ContextJ.Provider value={{...store, handleLogin, fetchData, handleRegister}}>
      <App />
    </ContextJ.Provider>
  );
};

export default Actions;
