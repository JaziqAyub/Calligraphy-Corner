import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export const DeleteUser = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const {userId} = useParams()
    const url = `http://localhost:4011/user/delete/${userId}`;
    const formData = {
      password,
    };
  
    const handleDeleteUser = async (e) => {
      try {
        e.preventDefault();
  
        const res = await axios.post(url, formData);
        toast.success(res.data.message);
        localStorage.clear()
        console.log(res);
        navigate("/")
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    };
 
    return (
        <div className="forgotpasscontainer">
          <ToastContainer position="top-center" />
    
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
              <button onClick={handleDeleteUser}>Delete Your Account</button>
            </div>
          </form>
        </div>
      );
    };
    
    export default DeleteUser;
    