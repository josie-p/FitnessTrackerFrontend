import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({token, setToken, loggedIn, setLoggedIn}) => {

  const navigate = useNavigate();

  return (
    <div id="navbar">
      <div id="siteName">
        <img className="tangerineIcon" src="https://cdn-icons-png.flaticon.com/512/1332/1332399.png"></img>
        <h2 onClick={() => {navigate("/")}}> tangerine </h2>
      </div>
      <div id="navLinks">
        { !loggedIn ?   <>
          <Link to="/login">login</Link>
          <Link to="/register">register!</Link>
          </>: null}
          <Link to="/routines">routines</Link>
          <Link to="/activities">activities</Link>
       
          { loggedIn ? <p onClick = { () => {setToken(""); 
          localStorage.setItem("token", "");
          localStorage.setItem("username", "");
          setLoggedIn(false);  
          console.log("logged out!");
          }}>logout</p> : null}

        <span className="material-symbols-outlined" onClick = {() => {        //add some type of message telling user this is their "profile"
          navigate("/my-routines");
        }}>
          skull
        </span>
    </div>
    </div>
  );
};

export default Navbar;