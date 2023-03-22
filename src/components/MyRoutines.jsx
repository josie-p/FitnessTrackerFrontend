import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import {
  getRoutinesByUserAPI,
  attachActivityToRoutineAPI,
} from "../api-adapter";
import { EditActivity, ErrorMessage } from "./";

const MyRoutines = () => {
  const [routines, setRoutines] = useState([]);
  const [, , , , activities, setActivities, ,] = useOutletContext();
//   console.log(activities, "activities from my routines");
  const [isSelected, setIsSelected] = useState(false);
  const [activityId, setActivityId] = useState();
  const [count, setCount] = useState();
  const [duration, setDuration] = useState();
  const [message, setMessage] = useState("");
  const token = window.localStorage.getItem("token");
  const username = window.localStorage.getItem("username");
  const [isEdit, setIsEdit] = useState(false);

  const getRoutinesByUser = async () => {
    const response = await getRoutinesByUserAPI(token, username);
    setRoutines(response);
  };

  useEffect(() => {
    getRoutinesByUser();
  }, []);

  const showEdit = () => {
    return(
      <EditActivity count={activity.count} duration={activity.duration} routineActivityId={activity.routineActivityId}/>
    )
  }

  const attachActivityToRoutine = async (
    routineId,
    activityId,
    count,
    duration
  ) => {
        const response = await attachActivityToRoutineAPI(
        routineId,
        activityId,
        count,
        duration
        );
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

  return (
    <div>
      <h1>{`Welcome ${localStorage.getItem("username")}!`}</h1>
      <h2> your routines: </h2>
      {message.length ? <ErrorMessage message={message} /> : null}
      {routines.length ? (
        routines.map((routine, idx) => {
          return (
            <div id="routine-card" key={idx}>
              <h4>{routine.creatorName}</h4>
              <h3>{routine.name}</h3>
              <p>{routine.goal}</p>
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
                <label htmlFor="add-activity">add activity to routine</label>
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
                        return (
                          <option
                            value={activity.id}
                            key={`the unique key is ${idx}`}
                          >
                            {activity.name}
                          </option>
                        );
                      })
                    : null}
                </select>
                {isSelected ? (
                  <div>
                    <label>count: </label>
                    <input
                      type="number"
                      onChange={(e) => {
                        setCount(e.target.value);
                      }}
                    ></input>
                    <label>duration: </label>
                    <input
                      type="number"
                      onChange={(e) => {
                        setDuration(e.target.value);
                      }}
                    ></input>
                  </div>
                ) : null}
                <button>submit</button>
              </form>
              <div>
                {routine.activities?.length
                  ? routine.activities.map((activity, idx) => {
                      return (
                        <div key={idx} className="activity-card-onRoutine">
                          <h5>{activity.name}</h5>
                          <p>{activity.description}</p>
                          <p>{activity.duration} minutes</p>
                          <p>x{activity.count}</p>
                         <button onClick={(e) => {
                          e.preventDefault();
                          // console.log(e.target.value, "target");
                          // setIsEdit(!isEdit);
                          // return(
                          //   <EditActivity count={activity.count} duration={activity.duration} routineActivityId={activity.routineActivityId}/>
                          // )
                           
                          // id=`${activity.name}`
                         }}>edit activity {activity.name}</button>
                         {/* { isEdit &&  document.getElementById(`${activity.name}`).value.includes(`${activity.name}`) ? <EditActivity count={activity.count} duration={activity.duration} routineActivityId={activity.routineActivityId}/> : null } */}
                          <button>delete activity</button>
                        </div>
                      );
                    })
                  : null}
              </div>
              <Link to={`/edit/${routine.id}`}>edit routine</Link>
              <Link to={`/delete/${routine.id}`}>delete routine</Link>
            </div>
          );
        })
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
};

export default MyRoutines;
