const BASE_URL = "https://fitness-tracker-api-iv35.onrender.com/api";

function makeHeaders (token){
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

export const logInAPI = async(username, password) => {
    try{
        const response =  await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });

        const result = await response.json();
        console.log(result, "result from api");
        return result;
    }catch(error){
        console.error(error);
    }
}

export const registerAPI = async(username, password) =>{
    try{
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });
        const result = await response.json();
        console.log(result, "register result from API");
        return result;
    } catch(error){
        console.error(error);
    }
}

export const getActivitiesAPI = async() => {
    try{
        const response = await fetch(`${BASE_URL}/activities`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        console.log(result, "result from getActivitiesAPI");
        return result;
    }catch(error){
        console.error(error);
    }
}

export const createNewActivityAPI = async(token, name, description) => {
    try{
        const response = await fetch(`${BASE_URL}/activities`, {
            method: "POST", 
            headers: makeHeaders(token),
            body: JSON.stringify({
                name: name,
                description: description
            }),
        });

        const result = await response.json();

        console.log(result, "result from createNew");
        return result;
    }catch(error){
        console.error(error)
    }
}

export const getRoutinesAPI = async() => {
    try{
        const response = await fetch(`${BASE_URL}/routines`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await response.json();
        
        console.log(result, "result from getRoutinesAPI");
        return result;
    } catch(error){
        console.error(error);
    }
}

export const getRoutinesByUserAPI = async(token, username) => {
    try{
        const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
            method: "GET",
            headers: makeHeaders(token),
        });
        const result = await response.json();
        console.log(result, "result from routinesByUser");
        return result;
    } catch(error){
        console.error(error);
    }
}

export const createNewRoutineAPI = async(token, name, goal, isPublic) =>{
    console.log(token, "token", name, "name", "goal", goal, "isPublic", isPublic);
   

    try{
        const response = await fetch(`${BASE_URL}/routines`, {
            method: "POST",
            headers: makeHeaders(token),
            body: JSON.stringify({
                name: name,
                goal: goal,
                isPublic: isPublic,
            }),
        });
        console.log(response, "response");

        const result = await response.json();

        console.log(result, "result from createNewRoutineAPI");
        return result;
    } catch(error){
        console.error(error);
    }
}

export const attachActivityToRoutineAPI = async( routineId, activityId, count, duration) => {
    try{
            const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    activityId: activityId, 
                    count: count,
                    duration: duration
                })
            });
            const result = await response.json();
            console.log(result, "result from attachACtivities");
            return result;
    }catch(error){
        console.error(error);
    }

}