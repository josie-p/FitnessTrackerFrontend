import React, { useState, useEffect } from "react";
import { getRoutinesByUserAPI } from "../api-adapter";

const MyRoutines = () => {
    const [routines, setRoutines] = useState([]);

    const token = window.localStorage.getItem("token");
    const username = window.localStorage.getItem("username");

    const getRoutinesByUser = async() => {
        const response = await getRoutinesByUserAPI(token, username);
        setRoutines(response);
        // console.log(routines, "routines from helper user routines");
    }

    useEffect(()=>{
        getRoutinesByUser();
    }, []);

    return(
        <div>
            <h1>
                {`Welcome ${localStorage.getItem("username")}!`}
            </h1>
            <h2> your routines: </h2>
            { routines.length ?  routines.map((routine, idx) =>{
                return(
                    <div id="routine-card" key={idx}>
                        <h4>{routine.creatorName}</h4>
                        <h3>{routine.name}</h3>
                        <p>{routine.goal}</p>
                        <div>
                            { routine.activities?.length ? routine.activities.map((activity, idx)=>{
                                return(
                                    <div key={idx} className="activity-card-onRoutine">
                                        <h5>{activity.name}</h5>
                                        <p>{activity.description}</p>
                                        <p>{activity.duration} minutes</p>
                                        <p>x{activity.count}</p>
                                    </div>
                                )
                            }) : null}
                        </div>
                    </div>
                )
            }) : <h1>LOADING...</h1>}
        </div>
    )
}

export default MyRoutines;