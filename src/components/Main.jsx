import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { Navbar } from "./";

const Main = () => {

    const [token, setToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    return(
        <div id="main">
            <Navbar token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Outlet context={[token, setToken, loggedIn, setLoggedIn]} />
        </div>
    )
}

export default Main