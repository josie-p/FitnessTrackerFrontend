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
        <div>
            <h1>{username}'s routines!</h1>
            {
                publicRoutines.map((routine, idx) => {
                    return(
                        <div className="public-user-routines" key={idx}>
                            <h5>{routine.creatorName}</h5>
                            <h6>{routine.name}</h6>
                            <p>{routine.goal}</p>
                            {
                                routine.activities?.length ? 
                                routine.activities.map((activity, idx) => {
                                    return(
                                        <div key={idx}>
                                            <p>{activity.name}</p>
                                            <p>{activity.description}</p>
                                            <p>{activity.count}</p>
                                            <p>{activity.duration}</p>
                                        </div>
                                    )
                                })
                                : null
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PublicUserRoutines;