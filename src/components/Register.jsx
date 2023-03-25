import React, {useState} from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
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
            navigate("/login");
        } else {
            setMessage("Unable to Register - user may already exist.")
        }
    }

    return(
        <div id="registerPage">
            { message.length? <ErrorMessage message={message}/> : null }
            <h1>Register Here!</h1>
            <h5>Please remember that your password must be at least 8 characters long!</h5>
            <div className="signInForms">
            <form onSubmit={(e) => {
                e.preventDefault();
                if(password === confirmPass){
                    register(username, password);
                } else {
                    setMessage("Passwords don't match! try again :)");
                }
            }}>

                <label>Username</label><br></br>
                <input type="text" onInput={(e) => {
                    setUsername(e.target.value);
                }}></input><br></br>

                <label>Password</label><br></br>
                <input type="password" min ={"8"} required onInput={(e) => {
                    setPassword(e.target.value);
                }}></input><br></br>

                <label> Confirm Password </label><br></br>
                <input type="password" min={"8"} required onInput={(e) =>{
                    setConfirmPass(e.target.value);
                }}></input><br></br>

                <button type="submit">register</button>

                <h4>Already have an account?</h4>
                <Link to="/login"> Login Here ! </Link>
            </form>
            </div>
        </div>
    )
}

export default Register;