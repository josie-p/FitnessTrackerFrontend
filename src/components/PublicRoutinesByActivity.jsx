import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicRoutinesByActivityAPI } from "../api-adapter";

const PublicRoutinesByActivity = () => {
 
    const { id } = useParams();
    const [publicRoutines, setPublicRoutines] = useState([]);

    const getPublicRoutinesByActivity = async(activityId) => {
        const response = await getPublicRoutinesByActivityAPI(activityId);
        if(!response?.id){
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
        <div>
            <h1>public routines by activity</h1>
            <div id="timeout">
                <h1> nothing found, please try reloading your page ! </h1>
            </div>
            {
                publicRoutines?.length ? 
                publicRoutines.map((routine, idx) => {
                    return(
                        <div className="public-routine-activities" key={`the unique index for this is ${idx}`}>
                            <h4>{routine.creatorName}</h4>
                            <h5>{routine.name}</h5>
                            <p>{routine.goal}</p>
                            {
                                routine.activities?.length ? 
                                routine.activities.map((activity, idx) => {
                                    return(

                                    <div key={`the unique index for this activity is ${idx}`}>
                                           <h6>{activity.name}</h6>
                                           <p>{activity.description}</p>
                                           <p>x{activity.count}</p>
                                           <p>{activity.duration} mins</p> 
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