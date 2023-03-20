import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({token, setToken, loggedIn, setLoggedIn}) => {
  return (
    <div id="navbar">
      <h2> I am navbar</h2>
      <Link to="/login">login</Link>
      { loggedIn ? <p onClick = { () => {setToken(""); 
      localStorage.setItem("token", "");
      setLoggedIn(false);  
      console.log("logged out!");
    }}>logout</p> : null}
    </div>
  );
};

export default Navbar;