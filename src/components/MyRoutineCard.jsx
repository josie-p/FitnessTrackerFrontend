import React, {useState} from "react";
import { EditActivity, ErrorMessage } from "./";
import { useOutletContext, Link } from "react-router-dom";
import {
    getRoutinesByUserAPI,
    attachActivityToRoutineAPI,
    deleteActivityAPI,
    deleteRoutineAPI
  } from "../api-adapter";

const myRoutineCard = (props) => {
    const routine = props.routine;

    const [, , , , activities, setActivities, ,] = useOutletContext();

    const [isSelected, setIsSelected] = useState(false);
    const [activityId, setActivityId] = useState();

    const [count, setCount] = useState();
    const [duration, setDuration] = useState();

    const [isEdit, setIsEdit] = useState(false);
    const [message, setMessage] = useState("");

    // const token = window.localStorage.getItem("token");
    // const username = window.localStorage.getItem("username");

    const attachActivityToRoutine = async ( routineId, activityId, count, duration ) => {
            const response = await attachActivityToRoutineAPI(routineId, activityId, count, duration);
            if (!response?.id) {
                setMessage(
                    "Oh no! It looks like there's a problem- check whether already have that activity in your routine."
                    );
                    scrollTo(0, 0);
                }
    
            setTimeout(()=>{
                if(response.id){window.location.reload()}
            }, 1000);
      };

      const deleteActivity = async (routineActivityId, token) => {
        if(confirm("are you sure?") === true){
            const response = await deleteActivityAPI(routineActivityId, token);
            console.log(response, "response from deleteActivity Helper Func");
            if(!response?.id){
                setMessage(
                    "Delete failed complete- try again later!"
                );
            }

            setTimeout(()=>{
                if(response.id){window.location.reload()}
            }, 500);
            
        } else {null}

      }

      const deleteRoutine = async(routineId, token) => {
          if(confirm("are you sure you want to delete this routine- this action is permanent.")){
            const response = await deleteRoutineAPI(routineId, token);
          console.log(response, "response from delete routine helper");
            if(response?.id){
              setMessage("Oh no! Your delete wasn't completed- try again!");
            }
  
            setTimeout(() => {
              if(response?.id){window.location.reload()}
            }, 500);
          }else{
            null;
          }

      }

    return(
        <div id="routine-card">

            {message.length ? <ErrorMessage message={message} /> : null}

              {/* <h4>{routine.creatorName}</h4> */}
              <h3 className="beforeContent title">{routine.name}</h3>
              <p><span className="beforeContent">Goal: </span>{routine.goal}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // console.log(e.target.value, 'from routines');
                  attachActivityToRoutine(
                    routine.id,
                    activityId,
                    count,
                    duration
                  );
                }}
              >
                <label htmlFor="add-activity" className="addActivityLabel">add activity to routine:</label>
                <select
                  name="add-activity"
                  id="add-activity"
                  onChange={(e) => {
                    setIsSelected(true);
                    setActivityId(e.target.value);
                  }}
                >
                  <option value="addactivity">add an activity</option>
                  {activities.length
                    ? activities.map((activity, idx) => {
                      let routineArr = [...routine.activities];

                      let nameArr = [];
                      for(let i = 0; i < routineArr.length; i++){
                        nameArr[i] = routineArr[i].name;
                      }

                      let exists = nameArr.includes(activity.name);
                      
                     if(!exists){
                      return (
                        <option
                          value={activity.id}
                          key={`the unique key is ${idx}`}
                        >
                          {activity.name}
                        </option>
                      );
                     }else{
                      return null;
                     }
                        // return (
                        //   <option
                        //     value={activity.id}
                        //     key={`the unique key is ${idx}`}
                        //   >
                        //     {activity.name}
                        //   </option>
                        // );
                      })
                    : null}
                </select>
                {isSelected ? (
                  <div>
                    <label className="addActivityLabels">count: </label>
                    <input
                      className="addActivityInputs"
                      type="number"
                      onChange={(e) => {
                        setCount(e.target.value);
                      }}
                    ></input>
                    <label className="addActivityLabels">duration: </label>
                    <input
                      className="addActivityInputs"
                      type="number"
                      onChange={(e) => {
                        setDuration(e.target.value);
                      }}
                    ></input>
                  </div>
                ) : null}
                <button className="myRoutinesButtons">add activity</button>
              </form>
              <div>
                {routine.activities?.length
                  ? routine.activities.map((activity, idx) => {
                      return (
                        <div key={idx} className="activity-card-onRoutine">
                          <h5 className="activityOnMyRoutinesName">{activity.name}</h5>
                          <p><span className="beforeContent">Description: </span>{activity.description}</p>
                          <p><span className="beforeContent">Duration: </span>{activity.duration} minutes</p>
                          <p><span className="beforeContent">Count: </span>x{activity.count}</p>
                         { isEdit ? <EditActivity count={activity.count} duration={activity.duration} routineActivityId={activity.routineActivityId}/> : null }
                          <button className="myRoutinesButtons" onClick= {(e)=>{
                            e.preventDefault();
                            deleteActivity(activity.routineActivityId, localStorage.getItem("token"));
                            }}>delete activity</button>
                        </div>
                      );
                    })
                    : null}
              </div>
              
                <button className="myRoutinesButtons"
                onClick={(e) => {
                     e.preventDefault();
                     setIsEdit(!isEdit);
                    }}>edit your activities </button>
                <Link to={`/edit/${routine.id}`}><button className="myRoutinesButtons">edit routine</button></Link>
                <button className="myRoutinesButtons"
                onClick={(e) => {
                  e.preventDefault();
                  deleteRoutine(routine.id, localStorage.getItem("token"));
                }}>delete routine</button>
            </div>
    )
}

export default myRoutineCard;