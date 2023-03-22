import React, {useState} from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { editActivityAPI } from "../api-adapter";

const EditActivity = ( { count, duration, routineActivityId } ) => {
 const [token, setToken,, , activities, setActivities, , ] = useOutletContext();
 const [newCount, setNewCount] = useState(count);
 const [newDuration, setNewDuration] = useState(duration);

const editActivityFrontEnd = async() => {
    const response = await editActivityAPI(routineActivityId, localStorage.getItem("token"), newCount, newDuration);
    console.log(response, "response from edit activity front end");
}

    return(
        <div>
            <form onSubmit={(e) => {e.preventDefault();
                                    editActivityFrontEnd();
            }}>
            <label>duration:</label>
                <input type="number" defaultValue={duration} onChange={(e) => {
                    setNewDuration(e.target.value)
                }}></input>
                <label>count:</label>
                <input type="number" defaultValue={count} onChange={(e) => {
                    setNewCount(e.target.value);
                }}></input>
                <button type="submit"> change</button>
            </form>

        </div>
    )
}

export default EditActivity;