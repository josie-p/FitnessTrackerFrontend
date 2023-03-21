import React, {useState} from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { editRoutineAPI } from "../api-adapter";

const EditRoutine = () => {
    const [, , , , , ,routines, setRoutines] = useOutletContext();
    console.log(routines, "routines from editRoutines");

    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");

    const {id} = useParams();
    const token = localStorage.getItem("token");
console.log(token, "TOKEN");
    const editRoutine = async () =>{
        const response = await editRoutineAPI(id, token, name, goal);
        console.log(response, "response from helper editRoutine");
    }

    const findCurrentRoutine = routines.filter((routine)=> {
        if(routine.id === Number(id)){
            return true;
        } else {
            return false;
        }
    });

    const currentRoutine = findCurrentRoutine[0];
    console.log(currentRoutine);
    return(
        <div id = "editRoutinePage">
            <h1>
                edit your routine!
            </h1>
            {routines.length ? 
            <form onSubmit={(e)=>{
                e.preventDefault();
                editRoutine();
            }}>
                <label>Name:</label>
                <input type="text" defaultValue={currentRoutine.name} onChange = {(e)=>{setName(e.target.value)}}></input>
                <label>Goal:</label>
                <textarea defaultValue={currentRoutine.goal} onChange ={(e)=>{setGoal(e.target.value)}}></textarea>
                <button type="submit">submit</button>
            </form>
           : <h1> LOADING ... </h1> }
        </div>
    )
}

export default EditRoutine;