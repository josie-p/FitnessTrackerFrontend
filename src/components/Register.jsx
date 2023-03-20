import React, {useState} from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ErrorMessage } from "./";
import { registerAPI } from "../api-adapter";


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [token, setToken, loggedIn, setLoggedIn] = useOutletContext();

    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    const register = async(username, password) => {
        const response = await registerAPI(username, password);

        if(response?.token){
            localStorage.setItem("token", response.token);
            setToken(response.token);
            setLoggedIn(true);
            navigate("/");
        } else {
            setMessage("Unable to Register - user may already exist.")
        }
    }

    return(
        <div>
            { message.length? <ErrorMessage message={message}/> : null }
            <h1>Register!</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                if(password === confirmPass){
                    register(username, password);
                } else {
                    setMessage("Passwords don't match! try again :)");
                }
            }}>

                <label>Username</label>
                <input type="text" onInput={(e) => {
                    setUsername(e.target.value);
                }}></input>

                <label>Password</label>
                <input type="password" onInput={(e) => {
                    setPassword(e.target.value);
                }}></input>

                <label> Confirm Password </label>
                <input type="password" onInput={(e) =>{
                    setConfirmPass(e.target.value);
                }}></input>

                <button type="submit">register</button>

                <h4>Already have an account?</h4>
                <h5> Login Here ! </h5>
            </form>
        </div>
    )
}

export default Register;