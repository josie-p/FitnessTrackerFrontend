import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({token, setToken, loggedIn, setLoggedIn}) => {
  return (
    <div id="navbar">
      <div id="siteName">
        <img className="tangerineIcon" src="https://cdn-icons-png.flaticon.com/512/1332/1332399.png"></img>
        <h2> tangerine </h2>
      </div>
      <div id="navLinks">
        { !loggedIn ?   <>
          <Link to="/login">login</Link>
          <Link to="/register">register!</Link>
          </>: null}
       
          { loggedIn ? <p onClick = { () => {setToken(""); 
          localStorage.setItem("token", "");
          setLoggedIn(false);  
          console.log("logged out!");
          }}>logout</p> : null}
          
      <span className="material-symbols-outlined">
        skull
      </span>
    </div>
    </div>
  );
};

export default Navbar;