import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { Navbar } from "./";
import { getActivitiesAPI } from "../api-adapter";

const Main = () => {

    const [token, setToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const [activities, setActivities] = useState([]);

    const getActivities = async() => {
        const response = await getActivitiesAPI();
        setActivities(response);
        console.log(response, "response from api");
    }

    useEffect(() => {
        getActivities();
    }, []);

    const checkLoggedIn = () =>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            setLoggedIn(true);
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return(
        <div id="main">
            <Navbar token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Outlet context={[token, setToken, loggedIn, setLoggedIn, activities, setActivities]} />
        </div>
    )
}

export default Main