import React, {  useState } from "react";
import Card from "../sharedComponent/Card";
import "./Home.css";

const Home = (props) => {
  const shop = " Happy shopping!";

  const [count, setCount] = useState(0);
  const handleIncrement = ()=>{
          setCount (count=>count+1)
  }

  // const [username, setUsername] = useState("")

  // const fetchData = async () => {
  //   try {
  //     const url = "http://localhost:4011/getUser/676272fa60a49284ce1f40ef"
  //     const response = await axios.get(url)
  //     console.log(response)
  //     setUsername(response.data.payload.username)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  

  // useEffect(()=>{
  //   fetchData()
  // },[])


  const [enableDarkMode, setEnableDarkMode] = useState(false)
  const handleDarkMode = ()=>{
    setEnableDarkMode(!enableDarkMode)
  }






  return (
    <div className={enableDarkMode ? "home-container-dark" : "home-container"}>
      <h1> {props.message} {props.user}</h1>
      <div className="card-container">
        <Card happyMessage={props.happy} shop={shop} />
      </div>
      <div className="Increment"> 
        The value of count is {count}
        <button onClick={handleIncrement}>Increment</button>
        </div>
      <button className="action-btn">Explore Now</button>
      <div className="darkmode">
        <button onClick={handleDarkMode}>{enableDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}</button>
      </div>
    </div>
  );
};

export default Home;
