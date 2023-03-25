import React, {useState, useEffect} from "react";
import { useOutletContext, Link } from "react-router-dom";
import { getActivitiesAPI } from "../api-adapter";

const Activities = () => {
    const [token, setToken, loggedIn, setLoggedIn, activities, setActivities] = useOutletContext();
    // const [activities, setActivities] = useState([]);

    // const getActivities = async() => {
    //     const response = await getActivitiesAPI();
    //     setActivities(response);
    //     console.log(response, "response from api");
    // }

    // useEffect(() => {
    //     getActivities();
    // }, []);

    return (
        <div id="activitiesPage">
            <h1>check out some fun, new activities that you can adopt into your fitness journey!</h1>
            {loggedIn ? <Link to="/new-activity" id="create-activity-onActivities">Create Activity!</Link> : null}
            {
                activities.map((activity, idx) => {
                    return(
                        <div id="activity-card" key={`the unique key for this card is ${idx}`}>
                             <Link to={`/routines/${activity.id}`}><h3 className="beforeContent title onActivities">{activity.name}</h3></Link>
                             <p><span className="beforeContent">Description: </span>{activity.description}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Activities;