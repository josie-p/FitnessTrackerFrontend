import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { createNewRoutineAPI } from "../api-adapter";

const CreateRoutine = () =>{
    const [token, setToken, , , , ] = useOutletContext();

    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const navigate = useNavigate();

    const newRoutine = async (token, name, goal, isPublic) =>{
        const response = await createNewRoutineAPI(token, name, goal, isPublic);
        console.log(response);

        if(response?.id){
            setTimeout(() => {
                navigate("/routines");
            }, 3000);
        }
    }
    
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
                    // if(isPublic === false){
                        setIsPublic(!isPublic);
                    // } 
                    // else {
                    //     setIsPublic(false);
                    // }
                    //     console.log(e.target.value, "e val");
                        console.log(isPublic, "after click");
                    //     console.log(document.getElementById(isPublicCheckBox.checked))
                }}></input>
                <button type="submit">Create New Routine</button>
            </form>
        </div>
    )
};

export default CreateRoutine;