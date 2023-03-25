import React, { useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { logInAPI } from "../api-adapter";
import { ErrorMessage } from "./";

const LogIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [, setToken, , setLoggedIn] = useOutletContext();

  const login = async (username, password) => {
    const response = await logInAPI(username, password);

    if (response?.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", response.user.username);
      setToken(response.token);
      setLoggedIn(true);
      navigate("/");
    }
    if (!response?.token) {
      setMessage(
        "You have entered the wrong username/password- try again later!"
      );
    }
  };

  return (
    <div id="loginPage">
      {message.length ? <ErrorMessage message={message} /> : null}
      <h1> Please Login to continue! </h1>
      <div className="signInForms">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(username, password);
          }}
        >
          <label>Username</label>
          <br></br>
          <input
            type="text"
            onInput={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <br></br>
          <label>Password</label>
          <br></br>
          <input
            type="password"
            onInput={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <br></br>
          <button type="submit">login</button>
          <h4>Don't have an account?</h4>
          <Link to="/register"> Register Here </Link>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
