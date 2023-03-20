import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./";

const Main = () => {
    return(
        <div id="main">
            <Navbar />
            <Outlet/>
        </div>
    )
}

export default Main