import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicRoutinesByActivityAPI } from "../api-adapter";

const PublicRoutinesByActivity = () => {
 
    const { id } = useParams();
    const [publicRoutines, setPublicRoutines] = useState([]);

    const getPublicRoutinesByActivity = async(activityId) => {
        const response = await getPublicRoutinesByActivityAPI(activityId);
        console.log(response, "public routines activities");
        setPublicRoutines(response);
    }

    useEffect(() => {
        getPublicRoutinesByActivity(id);
    }, [])


    return(
        <div>
            <h1>public routines by activity</h1>
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
                : null
            }
        </div>
    )
}

export default PublicRoutinesByActivity;