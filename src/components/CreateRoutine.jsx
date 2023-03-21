import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { createNewRoutineAPI } from "../api-adapter";
import { ErrorMessage } from "./ErrorMessage";

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
            // setTimeout(() => {
            //     navigate("/routines");
            // }, 2000);
            // newRoutines.unshift(response);
            // setNewRoutines(routines);
            // newRoutines.unshift(response);
            // setRoutines(newRoutines);


            // console.log(routines, 'new routines array');

            // newRoutines.unshift(response);
            // setRoutines(newRoutines);

            // navigate("/routines");
            const newRoutines = [...routines];
            newRoutines.unshift(response);
            setRoutines(newRoutines);
            console.log(routines, 'new routines array');

            setTimeout(() => {
                navigate("/routines");
            }, 3000);
    }}
    return(
        <div id="createRoutinePage">
           {/* {console.log(isPublic, "before click")} */}
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