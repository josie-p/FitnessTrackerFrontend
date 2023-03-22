import React, {useState} from "react";
import { useOutletContext, Link } from "react-router-dom";

const Routines = () => {
    const [token, setToken, loggedIn, setLoggedIn, , , routines, setRoutines] = useOutletContext();
    console.log(routines, "routines from Routines page");
    return(
        <div id="routinesPage">
            {loggedIn ? <div><Link to="/my-routines">See your routines!</Link> <Link to="/new-routine">Create Routine!</Link></div> : null}
            <h1>Routines page!</h1>
            { routines.length ?  routines.map((routine, idx) =>{
                return(
                    <div id="routine-card" key={idx}>
                        <Link to={`/${routine.creatorName}/routines`}><h4>{routine.creatorName}</h4></Link>
                        <h3>{routine.name}</h3>
                        <p>{routine.goal}</p>
                        <div>
                            { routine.activities?.length ? routine.activities.map((activity, idx)=>{
                                return(
                                    <div key={idx} className="activity-card-onRoutine">
                                        <Link to={`/routines/${activity.id}`}><h5>{activity.name}</h5></Link>
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

export default Routines;