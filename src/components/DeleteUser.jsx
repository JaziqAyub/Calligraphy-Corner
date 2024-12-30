// import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import {  ToastContainer } from 'react-toastify';
import { ContextJ } from '../context/Store';

export const DeleteUser = () => {
    const [password, setPassword] = useState("");
    // const navigate = useNavigate()

    const {userId} = useParams()
    // const url = `http://localhost:4011/user/delete/${userId}`;
    // const formData = {
    //   password,
    // };
  
    const {handleDeleteUser} = useContext(ContextJ)
    // const handleDeleteUser = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const res = await axios.post(url, formData);
    //     toast.success(res.data.message);
    //     localStorage.clear()
    //     toast.success(res.data.message)
    //     console.log(res);
    //     setTimeout(()=>{
    //     navigate("/")
    //     }, [3000])
    //   } catch (error) {
    //     console.error(error);
    //     toast.error(error.response.data.message);
    //   }
    // };
 
    return (
        <div className="forgotpasscontainer">
          <ToastContainer position="top-center"/>
    
          <form>
            <div className="input-container">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
    
            <div className="forgotbtn">
              <button onClick={(e)=>{handleDeleteUser(e, password, userId)}}>Delete Your Account</button>
            </div>
          </form>
        </div>
      );
    };
    
    export default DeleteUser;
    