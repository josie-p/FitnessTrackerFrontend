import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { logInAPI } from "../api-adapter";
import { ErrorMessage } from "./";


const LogIn = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken, loggedIn, setLoggedIn] = useOutletContext();

    const login = async(username, password) => {
        const response = await logInAPI(username, password);

        if(response?.token){
            localStorage.setItem("token", response.token);
            setToken(response.token);
            setLoggedIn(true);
            navigate("/");
        }else{
            setMessage("You have entered the wrong username/password- try again later!");
        }
    }

    return(
        <div>
            { message.length? <ErrorMessage message={message}/> : null }
            <h1>Login!</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                login(username, password);
            }}>
                <label>Username</label>
                <input type="text" onInput={(e) => {
                    setUsername(e.target.value);
                }}></input>
                <label>Password</label>
                <input type="password" onInput={(e) => {
                    setPassword(e.target.value);
                }}></input>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LogIn;