import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//CUSTOM HOOK USED IN SECUREPROFILE.JSX
export const IsAuthorised = () => {
  const navigate = useNavigate();
  // const token = localStorage.getItem("token")
  // console.log("token" + token)

  // method by using post req and send token through axios
  // const url = "http://localhost:4011/user/isAuth"
  // const verifyToken = async (token) =>{
  //     const res = await axios.post(url, token)
  //     if (res.status === 200 && res.data.messsage === "Token verified"){
  //         navigate("/")
  //     } else {
  //         navigate("/user/login")
  //     }
  // }

  // same method thru get and sending token through params
    const verifyToken = async (token) => {
    const url = `http://localhost:4011/user/isAuth/${token}`;
    const res = await axios.get(url, token);
    if (res.status === 200 && res.data.messsage === "Token verified") {
      navigate("/user/secureprofile");
      console.log(res)
    } else {
      navigate("/user/login");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/user/login");
    } else {
      verifyToken(token);
    }
  }, [navigate]);
};
export default IsAuthorised;
