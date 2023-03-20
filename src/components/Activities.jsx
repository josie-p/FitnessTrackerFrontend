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
            {loggedIn ? <Link to="/new-activity">Create Activity!</Link> : null}
            <h1>this is activities</h1>
            {
                activities.map((activity, idx) => {
                    return(
                        <div id="activity-card" key={`the unique key for this card is ${idx}`}>
                             <h3>{activity.name}</h3>
                             <p>{activity.description}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Activities;