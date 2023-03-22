import React, {useState} from "react";
import { EditActivity, ErrorMessage } from "./";
import { useOutletContext, Link } from "react-router-dom";
import {
    getRoutinesByUserAPI,
    attachActivityToRoutineAPI,
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

    return(
        <div id="routine-card">

            {message.length ? <ErrorMessage message={message} /> : null}

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
                         { isEdit ? <EditActivity count={activity.count} duration={activity.duration} routineActivityId={activity.routineActivityId}/> : null }
                          <button>delete activity</button>
                        </div>
                      );
                    })
                    : null}
              </div>
                <button onClick={(e) => {
                     e.preventDefault();
                     setIsEdit(!isEdit);
                    }}>edit your activities </button>
                <Link to={`/edit/${routine.id}`}><button>edit routine</button></Link>
                <Link to={`/delete/${routine.id}`}><button>delete routine</button></Link>
            </div>
    )
}

export default myRoutineCard;