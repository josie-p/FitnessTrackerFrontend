import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { createNewRoutineAPI } from "../api-adapter";
import { ErrorMessage } from "./";

const CreateRoutine = () =>{
    const [token, setToken, , , , , routines, setRoutines] = useOutletContext();

    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    // const [newRoutines, setNewRoutines] = useState([]);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const newRoutine = async (token, name, goal, isPublic) => {
        const response = await createNewRoutineAPI(token, name, goal, isPublic);
        console.log(response);

        if(response?.id){
            const newRoutines = [...routines];
            newRoutines.unshift(response);
            setRoutines(newRoutines);

            setTimeout(() => {
                navigate("/routines");
            }, 3000);
    }else{
        setMessage("Oh no! It seems there's been a mistake- there may be another routine by that name already. Try again!");
    }
}
    return(
        <div id="createRoutinePage">
           {message.length ? <ErrorMessage message={message} /> : null}
            <h1> This is create routine</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                newRoutine(token, name, goal, isPublic);
            }}>
                <label>Routine Name: </label>
                <input type="text" placeholder="intense leg day" required onInput={(e)=>{
                    setName(e.target.value);
                }}></input>
                <label> Goal: </label>
                <input type="text" placeholder="grow my quads to an incredible size" required onInput={(e)=> {
                    setGoal(e.target.value);
                }}></input>
                <label> Public Routine? </label>
                <input type="checkbox" value = {isPublic} id="isPublicCheckBox" onChange={(e)=>{
                        setIsPublic(!isPublic);
                        console.log(isPublic, "after click");
                }}></input>
                <button type="submit">Create New Routine</button>
            </form>
        </div>
    )
};


export default CreateRoutine;