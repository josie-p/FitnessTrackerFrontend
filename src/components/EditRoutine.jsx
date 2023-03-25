import React, { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { editRoutineAPI } from "../api-adapter";

const EditRoutine = () => {
  const [, , , , , , routines] = useOutletContext();

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const editRoutine = async () => {
    const response = await editRoutineAPI(id, token, name, goal, isPublic);
    setTimeout(() => {
      navigate("/my-routines");
    }, 1500);
  };

  useEffect(() => {
    console.log(routines, "routines from edit");
    if (routines?.length) {
      const findCurrentRoutine = routines.filter((routine) => {
        if (routine.id === Number(id)) {
          return true;
        } else {
          return false;
        }
      });

      const currentRoutine = findCurrentRoutine[0];
      console.log(currentRoutine, "current routine");
      if (currentRoutine?.length) {
        setGoal(currentRoutine.goal);
        setName(currentRoutine.name);
        setIsPublic(currentRoutine.isPublic);
      }
    }
  }, [routines]);

  return (
    <div className="hold-create-edit">
      <h1 className="editTitle">edit your routine!</h1>
      {routines?.length ? (
        <div className="create-edit-forms">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editRoutine();
            }}
          >
            <label>Name:</label>
            <br></br>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <br></br>
            <label>Goal:</label>
            <br></br>
            <textarea
              value={goal}
              onChange={(e) => {
                setGoal(e.target.value);
              }}
            ></textarea>
            <br></br>
            <label>Public?</label>
            <input
              type="checkbox"
              onChange={(e) => {
                setIsPublic(!isPublic);
              }}
            ></input>
            <br></br>
            <button type="submit">submit</button>
          </form>
        </div>
      ) : (
        <h1 className="loading-page"> LOADING ... </h1>
      )}
    </div>
  );
};

export default EditRoutine;
