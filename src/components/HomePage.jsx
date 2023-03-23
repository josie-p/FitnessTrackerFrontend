import React from "react";

const HomePage = () => {
    return(
        <div id="homePage">
            <div id="topHomePage">
                <h1>Tangerine</h1>
                <h3> Tangerine is the worlds most promising upcoming fitness tracker* </h3>
            </div>
            <div id="holdHomeContent">
                <div id="leftHomePage">
                    <h2>Welcome Home!</h2> 
                    {/* fill up whole side ? big text gradient ? */}
                </div>
                <div id="rightHomePage">
                    <h3> Reviews </h3>
                    <div id="reviews">
                        <p> this site is so cool dawg </p>
                    </div>
                    <h1>start your fitness journey with tangerine today!!!</h1>

                    <h3> Check out our most popular routines :</h3>
                    <button>Routines</button>

                    <div id ="homePageButtons">
                        <button>Sign Up!</button>
                        <button> Sign In</button>
                    </div>
            </div>
            </div>
            <h6>*it's not</h6>
        </div>
    )
}

export default HomePage;