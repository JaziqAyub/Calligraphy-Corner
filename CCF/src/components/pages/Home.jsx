import React, { useState } from "react";
// import Card from "../sharedComponent/Card";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/HeroImg.png";
import Component2 from "../../assets/Component2.png";
import ALLAH from "../../assets/ALLAH.jpg";
import Bookmark from "../../assets/Bookmark.jpg";
import birthday from "../../assets/birthday.jpg";
import chaar from "../../assets/chaar.png";
import grid from "../../assets/grid.png";
import grid3 from "../../assets/grid3.png";
import circle from "../../assets/circle.jpg";
import split from "../../assets/split.jpg";
import cover from "../../assets/cover.jpg";
import { RiBusLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdWorkspacePremium } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import "animate.css";

const Home = () => {
  const navigate = useNavigate();

  const testimonialsData = [
    {
      heading: "Testimonials",
      message:
        "“I was truly mesmerized by the exceptional artistry of Calligraphy Corner. Every stroke of their brush transforms my words into a masterpiece that not only captures the essence of my message but also reflects the rich Kashmiri heritage. The delicate balance of traditional technique with a modern touch makes each creation a timeless work of art. I couldn’t be happier with the result and the personal care they put into every detail.”",
      person: "- Yayha Khan",
    },
    {
      heading: "Testimonials",
      message:
        "“From my very first consultation, Calligraphy Corner impressed me with their passion for the craft. They took the time to understand my vision and infused it with a unique blend of classical calligraphy and contemporary design. The result is a stunning piece that elevates the beauty of my words. Every detail speaks volumes about their dedication to quality and creativity.”",
      person: "- Zulfikar Imtiyaz",
    },
    {
      heading: "Testimonials",
      message:
        "“Calligraphy Corner has a rare talent for turning simple phrases into a visual symphony of art and emotion. Their work is a beautiful fusion of tradition and innovation, where each letter is crafted with precision and care. I am incredibly proud to display this artwork and grateful for the experience.”",
      person: "- Noorain Niyaz",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleNext = () => {
    // Move to the next testimonial (wrap around to start if at end)
    setCurrentTestimonial(
      (prevIndex) => (prevIndex + 1) % testimonialsData.length
    );
  };

  const handlePrev = () => {
    // Move to the previous testimonial (wrap around to end if at start)
    setCurrentTestimonial(
      (prevIndex) =>
        (prevIndex - 1 + testimonialsData.length) % testimonialsData.length
    );
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

  const handleExplore = () => {
    navigate("/usershop");
  };

  const handleCustomization = () => {
    window.open(
      "https://www.instagram.com/direct/t/17845846670587721",
      "_blank"
    );
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
          <button onClick={handleExplore}> Explore</button>
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
                Browse, customize, and order with ease your perfect calligraphy
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
          <div className="grid1">
            <img src={grid} alt="grid" />
          </div>
          <div className="chaar">
            <img src={chaar} alt="img" />
          </div>
        </div>
      </div>

      {/* Customize  */}

      <div className="customize">
        <div className="customImg">
          <div className="customImg1">
            <img src={grid3} alt="" />
          </div>
          <div className="customImg2">
            <img src={split} alt="" />
          </div>
          <div className="customImg3">
            <img src={circle} alt="" />
          </div>
          <div className="customImg4">
            <img src={cover} alt="" />
          </div>
        </div>
        <div className="customWrite">
          <div className="customHeading">
            <h1>We Help You Customize Your Orders</h1>
            <p>
              Bring your vision to life with our personalized designs. Whether
              it’s a special quote, name, or date, we tailor each piece to your
              exact specifications, ensuring it’s as unique as you are.
            </p>
          </div>
          <div className="customGrid">
            <div>
              <p>
                <ul>
                  <li>
                    Personalised Canvases - Create a personalized masterpiece
                  </li>
                </ul>
              </p>
            </div>
            <div>
              <p>
                <ul>
                  <li>
                    Custom Calendars - Add a personal touch to your special day
                  </li>
                </ul>
              </p>
            </div>
            <div>
              <p>
                <ul>
                  <li>
                    Tailored Phone Covers - Express yourself with unique designs
                  </li>
                </ul>
              </p>
            </div>
            <div>
              <p>
                <ul>
                  <li>
                    Personalized Bookmarks - A special touch for every reader
                  </li>
                </ul>
              </p>
            </div>
            <button className="customButton" onClick={handleCustomization}>
              Customize
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials  */}

      <div
        className="testimonials"
        style={{ position: "relative", margin: "2rem 0" }}
      >
        <div className="testimonial-container">
          <h1>{testimonialsData[currentTestimonial].heading}</h1>
          <div  key={currentTestimonial} // re-renders on testimonial change
            className="animate__animated animate__fadeInRightBig">
          <p
           
          >
            {testimonialsData[currentTestimonial].message}
          </p>
          <h4 >{testimonialsData[currentTestimonial].person}</h4>
          </div>
         

          {/* Left arrow button */}
          <button
            className="arrow-left"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <IoIosArrowDropleft />
          </button>

          {/* Right arrow button */}
          <button
            className="arrow-right"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <IoIosArrowDropright />
          </button>
        </div>
      </div>

      {/* artist  */}
      <div className="artist">
        <h1>Meet The Artist</h1>
        <p>
          At{" "}
          <em>
            <strong>Calligraphy Corner</strong>
          </em>
          , every stroke of the brush tells a story, and that’s because our
          talented artist brings passion, skill, and a deep love for the craft
          into every piece created. With years of experience in the art of
          calligraphy, our artist has honed their technique, blending
          traditional methods with modern designs to create truly unique works
          of art. What sets them apart is not just technical mastery, but the
          ability to infuse emotion and meaning into every letter, turning each
          creation into a personal expression of beauty and thought. Whether
          it's an intricate piece for a special occasion or a personalized
          canvas to brighten your home, the artist’s attention to detail and
          commitment to quality ensures that every design is crafted to
          perfection. Inspired by a love for handwritten art and the timeless
          elegance it brings, their goal is to create pieces that resonate with
          people on a personal level, transforming words into art that will be
          cherished for years to come.
        </p>
      </div>

      {/* OG  */}

      {/* <div
        className={enableDarkMode ? "home-container-dark" : "home-container"}
      > */}
      {/* <h1>
          {props.message} {props.user}
        </h1> */}
      {/* <h1> {props.message} {store.username}</h1> */}
      {/* <div className="card-container">
          <Card happyMessage={props.happy} shop={shop} />
        </div> */}
      {/* <div className="Increment">
          <button onClick={handleIncrement}>Increment {count}</button>
        </div> */}
      {/* <button className="action-btn" onClick={handleExplore}>
          Explore Now
        </button> */}
      {/* <div className="darkmode">
          <button onClick={handleDarkMode}>
            {enableDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}
          </button>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default Home;
