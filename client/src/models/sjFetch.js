import {CurrentUser} from "./Users";
const api_root = "http://localhost:3000";

export default async function sjFetch(url, data){
    let response;

    const headers = {};
    if(CurrentUser && CurrentUser.UserID != null){
        headers.authorization = "bearer " + CurrentUser.UserID;
    }

    if(data){
        response = await fetch(api_root + url, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
    else { //GET
        response = await fetch(api_root + url, {
            headers
        });
    }

    if(response.ok){
        return await response.json();
    }
    else{
        throw await response.json();
    }
}