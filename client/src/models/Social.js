import sjFetch from "./sjFetch";

export default {
    async searchFriends(email){
        const results = await sjFetch('/social/find', {email: email});
        return {name: results.name, email: results.email, userID: results.userID};
    },
    FriendRequests: [],
    async start(){
        const results = await sjFetch('/social');
        if(results){
            for(let i = 0; i < results.requests.length; i++){
                this.FriendRequests.push({
                    name: results.requests[i].name,
                    email: results.requests[i].email,
                    userID: requests.results[i].userID
                });
            }
        }
    },
    async approveFriend(userID){
        const results = await sjFetch('/social/approveFriend', {friendID: userID});
        if(results){
            for(let i = 0; i < results.requests.length; i++){
                this.FriendRequests.push({
                    name: results.requests[i].name,
                    email: results.requests[i].email,
                    userID: requests.results[i].userID
                });
            }
            return {newFriend: results.newFriend};
        }
        else throw Error("Error trying to approve friend");
    },
    async requestFriend(userID){
        const results = await sjFetch('/social/requestFriend', {friendID: userID});
        if(results){
            for(let i = 0; i < results.requests.length; i++){
                this.FriendRequests.push({
                    name: results.requests[i].name,
                    email: results.requests[i].email,
                    userID: results.requests[i].userID
                });
            }
            return {requestedFriend: results.requestedFriend};
        }
        else throw Error("Error trying to request friend");
    }
}