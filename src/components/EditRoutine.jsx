import React, {useState, useEffect} from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { editRoutineAPI } from "../api-adapter";

const EditRoutine = () => {
    const [, , , , , ,routines, setRoutines] = useOutletContext();
    console.log(routines, "routines from editRoutines");

    const [name, setName] = useState("name");
    const [goal, setGoal] = useState("goal");
    const [isPublic, setIsPublic] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams();
    console.log(id, "id");
    const token = localStorage.getItem("token");
console.log(token, "TOKEN");
    const editRoutine = async () =>{
        console.log(name, goal);
        const response = await editRoutineAPI(id, token, name, goal, isPublic);
        console.log(response, "response from helper editRoutine");
        setTimeout(() => {
            navigate("/my-routines");
        }, 1500);
    }


    useEffect(() =>{
console.log(routines, "routines");
if(routines.length){
    const findCurrentRoutine = routines.filter((routine)=> { //use dot find for efficiency
        if(routine.id === Number(id)){
            return true;
        } else {
            return false;
        }
    });
    console.log(findCurrentRoutine, "findCurrentRoutine")

    const currentRoutine = findCurrentRoutine[0];
    console.log(currentRoutine, "currentRoutine");
    setGoal(currentRoutine.goal);
    setName(currentRoutine.name);
    setIsPublic(currentRoutine.isPublic);
}


    }, [routines])



    // const currentRoutine = findCurrentRoutine[0];
    // console.log(currentRoutine);
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
                <input type="text" value={name} onChange = {(e)=>{setName(e.target.value)}}></input>
                <label>Goal:</label>
                <textarea value={goal} onChange ={(e)=>{setGoal(e.target.value)}}></textarea>
                <label>Public?</label>
                <input type="checkbox" onChange={(e) => { setIsPublic(!isPublic) }}></input>
                <button type="submit">submit</button>
            </form>
           : <h1> LOADING ... </h1> }
        </div>
    )
}

export default EditRoutine;