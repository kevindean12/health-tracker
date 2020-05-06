import sjFetch from "./sjFetch";

export default {
    async searchFriends(email){
        const results = await sjFetch('/social/find', {email: email});
        return {Name: results.Name, Email: results.Email, UserID: results.UserID};
    },
    FriendRequests: [],
    SharedWithMe: [],
    Friends: [],
    async start(){
        try{
            const results = await sjFetch('/social');
            console.log("results from start social: ", results);
            this.FriendRequests = JSON.parse(JSON.stringify(results.requests));
            this.Friends = JSON.parse(JSON.stringify(results.friends));
            this.SharedWithMe = JSON.parse(JSON.stringify(results.shared));
        } catch(error) {
            console.error("Could not fetch social data.");
        }
    },
    async approveFriend(userID){
        try{
            const results = await sjFetch('/social/approveFriend', {friendID: userID});
            this.FriendRequests = results.requests;
            return {newFriend: results.newFriend};
        } catch(error) {
            console.error("Could not approve friend.");
        }
    },
    async requestFriend(userID){
        const results = await sjFetch('/social/requestFriend', {friendID: userID});
        try{
            for(let i = 0; i < results.requests.length; i++){
                const f = {
                    Name: results.requests[i].Name,
                    Email: results.requests[i].Email,
                    UserID: results.requests[i].UserID
                };
                if(!this.FriendRequests.some(x => x.UserID == f.UserID)){
                    this.FriendRequests.push(f);
                }
            }
            return {requestedFriend: results.requestedFriend};
        } catch(error) {
            console.error(error);
        }
    }
}