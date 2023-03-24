import React, {useState} from "react";
import { useOutletContext, Link } from "react-router-dom";

const Routines = () => {
    const [token, setToken, loggedIn, setLoggedIn, , , routines, setRoutines] = useOutletContext();
    console.log(routines, "routines from Routines page");
    return(
        <div id="routinesPage">
            <h1 id="routinePageTitle">curious about other user's workout routines? you're in the right place!</h1>
            {loggedIn ? <div><Link to="/my-routines" className="routinesLinks">See your routines!</Link> <Link to="/new-routine" className="routinesLinks">Create Routine!</Link></div> : null}
            { routines.length ?  routines.map((routine, idx) =>{
                return(
                    <div id="routine-card" key={idx}>
                        <Link to={`/${routine.creatorName}/routines`}><h4 id="routinesPageCreatorName"><span className="beforeContent">from: </span> {routine.creatorName}</h4></Link>
                        <h3 className="beforeContent title">{routine.name}</h3>
                        <p> <span className="beforeContent">Goal: </span>{routine.goal}</p>
                        <div>
                            { routine.activities?.length ? routine.activities.map((activity, idx)=>{
                                return(
                                    <div key={idx} className="activity-card-onRoutine">
                                        <Link to={`/routines/${activity.id}`}><h5 className="activityOnRoutineName" >{activity.name}</h5></Link>
                                        <p><span className="beforeContent">Description: </span>{activity.description}</p>
                                        <p><span className="beforeContent">Duration: </span>{activity.duration} minutes</p>
                                        <p><span className="beforeContent">Count: </span>x{activity.count}</p>
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