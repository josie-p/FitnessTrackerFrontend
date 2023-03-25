import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./";
import { getActivitiesAPI, getRoutinesAPI } from "../api-adapter";

const Main = () => {
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);

  const getActivities = async () => {
    const response = await getActivitiesAPI();
    setActivities(response);
  };
  useEffect(() => {
    getActivities();
  }, []);

  const getRoutines = async () => {
    const response = await getRoutinesAPI();
    const filterRoutines = response.filter((e) => {
      if (e.isPublic) {
        return true;
      } else {
        return false;
      }
    });
    setRoutines(filterRoutines);
  };
  useEffect(() => {
    getRoutines();
  }, []);

  const checkLoggedIn = () => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setLoggedIn(true);
    }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div id="main">
      <Navbar
        token={token}
        setToken={setToken}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Outlet
        context={[
          token,
          setToken,
          loggedIn,
          setLoggedIn,
          activities,
          setActivities,
          routines,
          setRoutines,
        ]}
      />
    </div>
  );
};

export default Main;
