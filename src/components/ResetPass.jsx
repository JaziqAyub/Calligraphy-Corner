import React, { useContext, useState } from "react";
import "./ResetPass.css";
// import axios from "axios";
import { useParams } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import { ContextJ } from "../context/Store";

const ResetPass = () => {
  // warna hume do hooks banane the alag alag
  const [formData, setFormData] = useState({
    newPass: "",
    confirmPass: "",
  });

  const {handleChangePass} = useContext(ContextJ)
  const { userId } = useParams(); //bringing email wali id here thru use params
  // const url = `http://localhost:4011/user/password/reset/${userId}`;

  // const handleChangePass = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const res = await axios.put(url, formData);
  //     toast.success(res.data.message);
  //     console.log(res);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //     console.log(error);
  //   }
  // };


  // basic boiler plate for keeping the previous state like keeping newPass and then validating confirmPass 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInput) => ({ ...prevInput, [name]: value }));
  };

  return (
    <div className="resetpass">
      <ToastContainer position="top-center" />
      <form>
        <input
          type="password"
          placeholder="Enter your new password"
          value={formData.newPass}
          onChange={handleChange}
          name="newPass"
        />
        {/* old code w/o using handleChange fro previous state management
        <input
          type="password"
          placeholder="Enter your new password"
          value={formData.newPass}
          onChange={(e) => {
            setFormData({ ...formData, newPass: e.target.value });
          }}
          name = "newPass"
        /> */}
        <input
          type="password"
          placeholder="Confirm your new password"
          value={formData.confirmPass}
          onChange={handleChange}
          name="confirmPass"
        />
        {/* <input
          type="password"
          placeholder="Confirm your new password"
          value={formData.confirmPass}
          onChange={(e) => {
            setFormData({ ...formData, confirmPass: e.target.value });
          }}
          name = "confirmPass"
        /> */}
      </form>

      <button onClick={(e)=>{handleChangePass(e, userId, formData)}}>Change Paassword</button>
    </div>
  );
};

export default ResetPass;
