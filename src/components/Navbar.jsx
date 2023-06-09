import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setToken, loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <div id="navbar">
      <div id="siteName">
        <img
          className="tangerineIcon"
          src="https://cdn-icons-png.flaticon.com/512/1332/1332399.png"
        ></img>
        <h2
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          tangerine{" "}
        </h2>
      </div>
      <div className="navLinks">
        {!loggedIn ? (
          <>
            <Link to="/login">
              <button>login</button>
            </Link>
            <Link to="/register">
              <button>register</button>
            </Link>
          </>
        ) : null}
        <Link to="/routines">
          <button>routines</button>
        </Link>
        <Link to="/activities">
          <button>activities</button>
        </Link>

        {loggedIn ? (
          <div className="navLinks">
            <Link to="/" id="logoutButton">
              <button
                onClick={() => {
                  setToken("");
                  localStorage.setItem("token", "");
                  localStorage.setItem("username", "");
                  setLoggedIn(false);
                }}
              >
                logout
              </button>
            </Link>

            <span
              className="material-symbols-outlined"
              title="See Your Routines!"
              onClick={() => {
                navigate("/my-routines");
              }}
            >
              skull
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
