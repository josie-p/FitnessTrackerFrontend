import React, {useState, useEffect} from "react";
import { useOutletContext, useNavigate, useParams, useLocation } from "react-router-dom";
import { createNewActivityAPI } from "../api-adapter";


const CreateActivity = () => {
const [token, setToken, loggedIn, setLoggedIn, activities, setActivities] = useOutletContext();
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [newActivities, setNewActivities] = useState(activities);
const navigate = useNavigate();

const newActivity = async(token, name, description) => {
    const response = await createNewActivityAPI(token, name, description);
    console.log(response);
    if(response?.id){
        newActivities.unshift(response);
        setActivities(newActivities);
        setTimeout(() => {
            navigate("/activities");
        }, 3000);
    }

}

    return(
        <div id="createActivityPage">
            <h1>create activity</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                newActivity(token, name, description);
            }}>
                <label>Activity Name</label>
                <input type="text" placeholder="e.g. running, jumping" onInput={
                    (e) => {
                        setName(e.target.value);
                    }
                }></input>
                <label>Activity Description</label>
                <textarea placeholder="e.g. 'run for thirty minutes!'" onInput={
                    (e) => {
                        setDescription(e.target.value);
                    }
                }></textarea>
                <button type="submit">create new activity</button>
            </form>
        </div>
    )
}

export default CreateActivity;
