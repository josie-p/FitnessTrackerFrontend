import React, {useState} from "react";
import { useOutletContext, Link } from "react-router-dom";

const Routines = () => {
    const [token, setToken, loggedIn, setLoggedIn, , , routines, setRoutines] = useOutletContext();
    return(
        <div id="routinesPage">
            {loggedIn ? <Link to="/new-routine">Create Routine!</Link> : null}
            <h1>Routines page!</h1>
            { routines.map((routine, idx) =>{
                return(
                    <div id="routine-card" key={idx}>
                        <h4>{routine.creatorName}</h4>
                        <h3>{routine.name}</h3>
                        <p>{routine.goal}</p>
                        <div>
                            {routine.activities.map((activity, idx)=>{
                                return(
                                    <div key={idx} className="activity-card-onRoutine">
                                        <h5>{activity.name}</h5>
                                        <p>{activity.description}</p>
                                        <p>{activity.duration} minutes</p>
                                        <p>x{activity.count}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Routines;