import React, { useState } from "react";
import Card from "../sharedComponent/Card";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/HeroImg.png";
import Component2 from "../../assets/Component2.png";


const Home = (props) => {
  const shop = " Happy shopping!";
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount((count) => count + 1);
  };

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

  const [enableDarkMode, setEnableDarkMode] = useState(false);
  const handleDarkMode = () => {
    setEnableDarkMode(!enableDarkMode);
  };

  const handleExplore = () => {
    navigate("/shop");
  };

  // const {store} = useContext(ContextJ)
  return (
    <>
      <div className="heroSection">
        <div className="herohead1">
          <p>Your Words,<br />
             Our Art</p>
          <div className="herosub1">
            Transforming thoughts into masterpieces. Where every stroke tells a
            story and every piece is crafted with care. Celebrate your moments
            with art that speaks from the heart.
          </div>
          <button className="hero-btn1" onClick={handleExplore}>
            Shop Now
          </button>
          <button className="hero-btn2" onClick={handleExplore}>
            Explore 
          </button>

          <div className="imgHero">
          <img src={HeroImg} alt="Calligraphy" className="heroImage" />
          </div>
          <div className="imgHero2">
          <img src={Component2} alt="Calligraphy" className="heroImage" />
          </div>
        </div>
      </div>

      <div
        className={enableDarkMode ? "home-container-dark" : "home-container"}
      >
        <h1>
          {props.message} {props.user}
        </h1>
        {/* <h1> {props.message} {store.username}</h1> */}
        <div className="card-container">
          <Card happyMessage={props.happy} shop={shop} />
        </div>
        <div className="Increment">
          <button onClick={handleIncrement}>Increment {count}</button>
        </div>
        <button className="action-btn" onClick={handleExplore}>
          Explore Now
        </button>
        <div className="darkmode">
          <button onClick={handleDarkMode}>
            {enableDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
