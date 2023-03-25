import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { createNewActivityAPI } from "../api-adapter";

const CreateActivity = () => {
  const [token, , , , activities, setActivities] = useOutletContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newActivities, setNewActivities] = useState(activities);
  const navigate = useNavigate();

  const newActivity = async (token, name, description) => {
    const response = await createNewActivityAPI(token, name, description);
    if (response?.id) {
      newActivities.unshift(response);
      setActivities(newActivities);
      setTimeout(() => {
        navigate("/activities");
      }, 500);
    }
  };

  return (
    <div className="hold-create-edit">
      <h1 className="editTitle">create activity</h1>
      <div className="create-edit-forms">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newActivity(token, name, description);
          }}
        >
          <label>Activity Name</label>
          <br></br>
          <input
            type="text"
            placeholder="e.g. running, jumping"
            onInput={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <br></br>
          <label>Activity Description</label>
          <br></br>
          <textarea
            placeholder="e.g. 'run for thirty minutes!'"
            onInput={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <br></br>
          <button type="submit">create new activity</button>
        </form>
      </div>
    </div>
  );
};

export default CreateActivity;
