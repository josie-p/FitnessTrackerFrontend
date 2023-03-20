const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/";

function makeHeaders (token){
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}
