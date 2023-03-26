import React, { useState } from "react";
import { editActivityAPI } from "../api-adapter";

const EditActivity = ({ count, duration, routineActivityId }) => {
  const [newCount, setNewCount] = useState(count);
  const [newDuration, setNewDuration] = useState(duration);

  const editActivityFrontEnd = async () => {
    const response = await editActivityAPI(
      routineActivityId,
      localStorage.getItem("token"),
      newCount,
      newDuration
    );
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editActivityFrontEnd();
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }}
      >
        <label className="addActivityLabels">duration: </label>
        <input
          className="addActivityInputs"
          type="number"
          defaultValue={duration}
          onChange={(e) => {
            setNewDuration(e.target.value);
          }}
        ></input>
        <label className="addActivityLabels">count: </label>
        <input
          className="addActivityInputs"
          type="number"
          defaultValue={count}
          onChange={(e) => {
            setNewCount(e.target.value);
          }}
        ></input>
        <button className="myRoutinesButtons" type="submit">
          {" "}
          change
        </button>
      </form>
    </div>
  );
};

export default EditActivity;
