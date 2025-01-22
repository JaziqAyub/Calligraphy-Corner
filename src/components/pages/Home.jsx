import React, { useState } from "react";
import Card from "../sharedComponent/Card";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/HeroImg.png";
import Component2 from "../../assets/Component2.png";
import ALLAH from "../../assets/ALLAH.jpg";
import Bookmark from "../../assets/Bookmark.jpg";
import birthday from "../../assets/birthday.jpg";
import { RiBusLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdWorkspacePremium } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";

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
          <p>
            Your Words,
            <br />
            Our Art
          </p>
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
        </div>
        <div className="imgHero">
          <img src={HeroImg} alt="Calligraphy" className="heroImage" />
        </div>
        <div className="imgHero2">
          <img src={Component2} alt="Calligraphy" className="heroImage" />
        </div>
      </div>

      {/* feature  */}

      <div className="featureSection">
        <div className="featureWrite">
          <h1>Discover Our Finest Calligraphy Masterpieces</h1>
          <p>
            From elegant canvases to personalized designs, each creation tells a
            story crafted with passion and precision.
          </p>
          <button>Explore</button>
        </div>
        <div className="featureImgs">
          <div>
            <img src={ALLAH} alt="img1" />
            <p>Small Canvas</p>
            <h2>₹ 1499</h2>
          </div>
          <div>
            <img src={Bookmark} alt="img2" />
            <p>Bookmark</p>
            <h2>₹ 299</h2>
          </div>
          <div>
            <img src={birthday} alt="img3" />
            <p>Birthday Calendar</p>
            <h2>₹ 599</h2>
          </div>
        </div>
      </div>

      {/* chooseUS  */}

      <div className="chooseUs">
        <div className="chooseWrite">
          <div className="chooseHeading">
            <h1>Why Choose Us</h1>
            <p>
              Calligraphy isn’t just our craft—it’s our passion. Each design is
              infused with love and dedication.
            </p>
          </div>
          <div className="chooseBox">
            <div className="fast">
              <RiBusLine />
              <h2>Fast & Reliable Shipping</h2>
              <p>
                We prioritize speed without compromising on quality, ensuring
                your order reaches you on time, every time.
              </p>
            </div>
            <div className="easy">
              <HiOutlineShoppingBag />
              <h2>Easy to Shop</h2>
              <p>
                Browse, customize, and order with ease—your perfect calligraphy
                piece is just a click away.
              </p>
            </div>
            <div className="premium">
              <MdWorkspacePremium />
              <h2>Premium Quality</h2>
              <p>
                We use the finest materials to ensure every creation is as
                durable as it is beautiful.
              </p>
            </div>
            <div className="dedicated">
              <LuHeartHandshake />
              <h2>Dedicated Service</h2>
              <p>
                We work closely with you to make sure your order is perfect,
                from start to finish.
              </p>
            </div>
          </div>
        </div>



        <div className="chooseImg">

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
