import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPublicUserRoutinesAPI } from "../api-adapter";

const PublicUserRoutines = () => {
    const [publicRoutines, setPublicRoutines] = useState([]);
    const { username } = useParams();

    const getPublicUserRoutines = async(username, token) => {
        const response = await getPublicUserRoutinesAPI(username, token);
        console.log(response, "response from public user routines");
        setPublicRoutines(response);
    }

    useEffect(() => {
        getPublicUserRoutines(username, localStorage.getItem("token"));
    }, [])

    return(
        <div id="publicRoutinesByUserPage">
            <h1>{username}'s routines!</h1>
            {publicRoutines?.length ?
                publicRoutines.map((routine, idx) => {
                    return(
                        <div className="public-routine-cards" key={idx}>
                            <h4 className="publicRoutinesCreatorName"><span className="beforeContent">from: </span>{routine.creatorName}</h4>
                            <h5>{routine.name}</h5>
                            <p>{routine.goal}</p>
                            {
                                routine.activities?.length ? 
                                routine.activities.map((activity, idx) => {
                                    return(
                                        <div key={idx} className="activity-card-onPublicRoutine">
                                            <p className="publicRoutinesActivityName">{activity.name}</p>
                                            <p>{activity.description}</p>
                                            <p>{activity.duration} mins</p>
                                            <p>x{activity.count}</p>
                                        </div>
                                    )
                                })
                                : null
                            }
                        </div>
                    )
                })
            : <h1>LOADING...</h1>}
        </div>
    )
}

export default PublicUserRoutines;