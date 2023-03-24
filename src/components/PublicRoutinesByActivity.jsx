import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicRoutinesByActivityAPI } from "../api-adapter";

const PublicRoutinesByActivity = () => {
 
    const { id } = useParams();
    const [publicRoutines, setPublicRoutines] = useState([]);

    const getPublicRoutinesByActivity = async(activityId) => {
        const response = await getPublicRoutinesByActivityAPI(activityId);
        if(!response){
            setTimeout(()=>{
                console.log("are we getting here");
                document.getElementById("timeout").style.display="flex";
            }, 5000)
        }
        console.log(response, "public routines activities");
        setPublicRoutines(response);
    }

    useEffect(() => {
        getPublicRoutinesByActivity(id);
    }, [])


    return(
        <div id="publicRoutinesByActivityPage">
            <h1>checkout routines with this activity!</h1>
            <div id="timeout">
                <h1> nothing found, please try reloading your page ! </h1>
            </div>
            {
                publicRoutines?.length ? 
                publicRoutines.map((routine, idx) => {
                    return(
                        <div className="public-routine-cards" key={`the unique index for this is ${idx}`}>
                            <h4 className="publicRoutinesCreatorName" ><span className="beforeContent">from: </span>{routine.creatorName}</h4>
                            <h5 className="beforeContent title">{routine.name}</h5>
                            <p>{routine.goal}</p>
                            {
                                routine.activities?.length ? 
                                routine.activities.map((activity, idx) => {
                                    return(

                                    <div key={`the unique index for this activity is ${idx}`} className="activity-card-onPublicRoutine">
                                           <p className="publicRoutinesActivityName">{activity.name}</p>
                                           <p><span className="beforeContent">Description: </span>{activity.description}</p>
                                           <p><span className="beforeContent">Duration: </span>{activity.duration} mins</p> 
                                           <p><span className="beforeContent">Count: </span>x{activity.count}</p>
                                    </div>
                                    )
                                })
                                : null
                            }
                        </div>
                    )
                })
                : <h1> LOADING... </h1>
            }
        </div>
    )
}

export default PublicRoutinesByActivity;