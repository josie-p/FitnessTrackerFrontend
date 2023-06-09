import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MirrorLogo from "./images/mirrorTang.png";

const HomePage = () => {
  const navigate = useNavigate();

  const routinesMessage = () => {
    setTimeout(() => {
      document.getElementById("myRoutinesMessage").style.display = "none";
    }, 4000);
  };

  useEffect(() => {
    routinesMessage();
  }, []);

  return (
    <div id="homePage">
      {localStorage.getItem("token")?.length ? (
        <span id="myRoutinesMessage">
          click on the skull to see your routines!
        </span>
      ) : null}
      <div id="topHomePage">
        <div id="welcomeHomeText">
          <h2>
            <img
              className="logo"
              src="https://cdn-icons-png.flaticon.com/512/1332/1332399.png"
            />
            Welcome Home!
            <img className="logo" src={MirrorLogo} />
          </h2>
        </div>
        <h3>
          {" "}
          Tangerine is the world's most promising upcoming fitness tracker*{" "}
        </h3>
      </div>
      <div id="holdHomeContent">
        <div id="rightHomePage">
          <h3>hear from other users!</h3>
          <div id="reviews">
            <div className="review-card">
              <h5>From Sandra</h5>
              <p>
                {" "}
                "Friendly, easy-to-use website that keeps me on track and
                accountable for my super cool gym routines"{" "}
              </p>
              <i className="material-icons">star star star star star</i>
            </div>
            <div className="review-card">
              <h5>From Albert</h5>
              <p>
                {" "}
                "Love the site and how it helps me keep track of my fitness
                goals- the ultimate gym day planner."{" "}
              </p>
              <i className="material-icons">star star star star star</i>
            </div>
            <div className="review-card">
              <h5>From Glamgal</h5>
              <p>
                {" "}
                "Tangerine helped me move forward with and keep track of my
                fitness goals and stay forever glam."{" "}
              </p>
              <i className="material-icons">star star star star star</i>
            </div>
          </div>
          <h1>start your fitness journey with tangerine today!!!</h1>
          <div id="holdHomeButtons">
            <button
              className="homePageButtons"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up!
            </button>
            <button
              className="homePageButtons"
              onClick={() => {
                navigate("/login");
              }}
            >
              {" "}
              Sign In
            </button>
          </div>
          <div id="checkRoutines">
            <h3> Check out our most popular routines :</h3>
            <button
              id="routinesButton"
              onClick={() => {
                navigate("/routines");
              }}
            >
              Routines
            </button>
          </div>
        </div>
      </div>
      <h6 className="itsNot">*it's not</h6>
    </div>
  );
};

export default HomePage;
