import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRoutinesByUserAPI } from "../api-adapter";
import { MyRoutineCard } from "./";

const MyRoutines = () => {
  const [routines, setRoutines] = useState([]);

  const token = window.localStorage.getItem("token");
  const username = window.localStorage.getItem("username");

  const getRoutinesByUser = async () => {
    const response = await getRoutinesByUserAPI(token, username);
    setRoutines(response);
  };

  useEffect(() => {
    getRoutinesByUser();
  }, []);

  return (
    <div id="myRoutinesContainer">
      <h1 id="welcomeMyRoutines">
        {`Hi ${localStorage.getItem("username")}!`}{" "}
        <Link to="/new-routine">
          <button id="myRoutinesCreateNewButton">Create a new Routine</button>
        </Link>{" "}
      </h1>

      <div id="yourRoutinesHolder">
        <h2> your routines: </h2>
        {routines.length ? (
          routines.map((routine, idx) => {
            return <MyRoutineCard routine={routine} key={idx} />;
          })
        ) : (
          <h1 className="loading-page">LOADING...</h1>
        )}
      </div>
    </div>
  );
};

export default MyRoutines;
