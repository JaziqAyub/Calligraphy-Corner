import { createContext, useCallback, useState } from "react";
import api from "../utils/AxiosInstance";
import App from "../App";
// import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

export const ContextJ = createContext();

const Store = () => {
  // const baseUrl = "http://localhost:4011";
  const navigate = useNavigate();
  // const userId = localStorage.getItem("userId")
  const [store, setStore] = useState({
    loading: false,
    username: "",
    user: {}, //to get whole user
    item: {},
  });
  // getUser of  backend
  const fetchData = useCallback(async () => {
    // if (!userId) return;
    try {
      const response = await api.get("/getUser");
      console.log(response);
      setStore((prev) => ({
        ...prev,
        username: response.data.payload.username,
        user: response.data.payload,
      }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  //login
  const handleLogin = async (e, formData) => {
    e.preventDefault();
    // above line cause to prevent button default nehaviour whihc is submititing the form
    try {
      setStore((prev) => ({ ...prev, loading: true }));
      const response = await api.post(`/user/login`, formData); //for cookies
      console.log(response);
      if (response.data.message === "Logged in successfully!") {
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("userId", response.data.userId);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/user/secureprofile");
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

  //register
  const handleRegister = async (e, formData) => {
    e.preventDefault();
    // above line cause to prevent button default nehaviour whihc is submititing the form
    try {
      const response = await api.post(`/user/register`, formData);
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

  //reset
  const handleChangePass = async (e, userId, formData) => {
    e.preventDefault();
    const url = `/user/password/reset/${userId}`;
    try {
      const res = await api.put(url, formData);
      toast.success(res.data.message);
      console.log(res);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  //forgot
  const handleForgotPass = async (e, formData) => {
    e.preventDefault();
    try {
      const res = await api.post(`/user/forgotPass`, formData);
      toast.success(res.data.message);
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  //deleteUser
  const handleDeleteUser = async (e, password, userId) => {
    e.preventDefault();
    try {
      const res = await api.post(`/user/delete`, { password: password });
      toast.success(res.data.message);
      localStorage.clear();
      toast.success(res.data.message);
      console.log(res);
      setTimeout(() => {
        navigate("/");
      }, [3000]);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  //item
  const createItems = async (formData) => {
    try {
      setStore((prev) => ({ ...prev, loading: true }));
      const res = await api.post("/admin/createItem", formData);
      if (res.status === 200) {
        // toast.success("Item Created Succesfully");
        sessionStorage.setItem("itemId", res.data.payload._id);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
      // if (error.status === 400) {
      //   toast.error("All credentials required");
      // } else {
      //   toast.error("Server Error");
      //      }
    } finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }
  };

  //item
  const UploadItemPicture = async (formData, itemId) => {
    try {
      setStore((prev) => ({ ...prev, loading: true }));
      const res = await api.post(
        `/admin/upload/Itempicture?itemId=${itemId}`,
        formData
      );
      if (res.status === 200) {
        // toast.success("Upload success");
        return true;
      }
      toast.error("Submit failed");
      // navigate("/shop");
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }
  };

  //item
  const deleteItemById = async (itemId) => {
    try {
      setStore((prev) => ({ ...prev, loading: true }));
      const res = await api.delete(`/item/delete/${itemId}`);
      if (res) {
        toast.success("Item deleted successfuly!");
      } else {
        toast.error("Some error!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error!");
    } finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }
  };

  //item
  const editItemById = async (itemId, formData) => {
    try {
      setStore((prev) => ({ ...prev, loading: true }));

      const res = await api.put(`/item/edit?itemId=${itemId}`, formData);
      if (res.status === 200) {
        toast.success(res.data.message);
        return true;
      }
    } catch (error) {
      console.log(error);
      if (error.response && (error.response.status === 400 || 404 || 500)) {
        toast.error(error.response.data.message || "server Error");
      } else {
        toast.error("An unexpected error occurred!");
      }
      return false;
    } finally {
      setStore((prev) => ({ ...prev, loading: false }));
    }
  };

  //item
  const getItemById = useCallback(async (itemId) => {
    try {
      const res = await api.get(`/items/item?itemId=${itemId}`);
      if (res.status === 200) {
        setStore((prev) => ({ ...prev, item: res.data.payload }));
      }
    } catch (error) {
      console.log(error);
      if (error.response && (error.response.status === 400 || 404 || 500)) {
        toast.error(error.response.data.message || "server Error");
      } else {
        toast.error("An unexpected error occurred!");
      }
    }
  }, []);

  //order
  const createOrder = async (itemId, formData) => {
    try {
      const res = await api.post(`/customer/create/order?itemId=${itemId}`, formData);
      if (res) {
        toast.success("Order Created Successfuly, please initiate the payment");
        const orderId = res.data.payload._id
        navigate(`/order/payment/${orderId}`)
      } else {
        toast.error("Order creation failed!!!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Order server error!");
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await api.put(`/customer/cancel/order?orderId=${orderId}`)
      console.log(res)

      if (res.status === 200) {
        toast.success(res.data.message || "Order Cancelled ")
      } else {
        toast.error("Order cancellation failed")
      }
    } catch (error) {
      console.log(error)
      toast.error("Order cancellation server erro")
    }
  }
  return (
    <ContextJ.Provider
      value={{
        ...store,
        handleLogin,
        fetchData,
        handleRegister,
        handleChangePass,
        handleForgotPass,
        handleDeleteUser,
        createItems,
        UploadItemPicture,
        deleteItemById,
        editItemById,
        getItemById,
        createOrder,
        cancelOrder
      }}
    >

      <App />
    </ContextJ.Provider>
  );
};

export default Store;
