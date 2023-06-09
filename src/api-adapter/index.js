// const BASE_URL = "https://fitness-tracker-api-iv35.onrender.com/api";
const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";
// const BASE_URL = "http://localhost:3000/api";

function makeHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const logInAPI = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registerAPI = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getActivitiesAPI = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createNewActivityAPI = async (token, name, description) => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: makeHeaders(token),
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getRoutinesAPI = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getRoutinesByUserAPI = async (token, username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      method: "GET",
      headers: makeHeaders(token),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createNewRoutineAPI = async (token, name, goal, isPublic) => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: makeHeaders(token),
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const attachActivityToRoutineAPI = async (
  routineId,
  activityId,
  count,
  duration
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activityId: activityId,
          count: count,
          duration: duration,
        }),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const editRoutineAPI = async (
  routineId,
  token,
  name,
  goal,
  isPublic
) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: isPublic,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const editActivityAPI = async (
  routineActivityId,
  token,
  count,
  duration
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: makeHeaders(token),
        body: JSON.stringify({
          count: count,
          duration: duration,
        }),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteActivityAPI = async (routineActivityId, token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: makeHeaders(token),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRoutineAPI = async (routineId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: makeHeaders(token),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getPublicUserRoutinesAPI = async (username, token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      method: "GET",
      headers: makeHeaders(token),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getPublicRoutinesByActivityAPI = async (activityId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/activities/${activityId}/routines`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
