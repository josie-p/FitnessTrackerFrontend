const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

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