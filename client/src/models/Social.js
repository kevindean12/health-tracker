import sjFetch from "./sjFetch";

export default {
    async searchFriends(email){
        const results = await sjFetch('/social/find', {email: email});
        return {name: results.name, email: results.email, userID: results.userID};
    },
    FriendRequests: [],
    SharedWithMe: [],
    async start(){
        const results = await sjFetch('/social');
        console.log("results from start social: ", results);
        if(results){
            for(let i = 0; i < results.requests.length; i++){
                const f = {
                    name: results.requests[i].name,
                    email: results.requests[i].email,
                    userID: results.requests[i].userID,
                    ID: results.requests[i].ID
                };
                if(!this.FriendRequests.some(x => x.ID == f.ID)){
                    this.FriendRequests.push(f);
                }
            }
            for(let j = 0; j < results.shared.workouts.length; j++){
                const workout = {
                    type: "Workout",
                    post: {...results.shared.workouts[j]}
                };
                if(!this.SharedWithMe.filter(x => x.type == "Workout").some(x => x.WID == workout.WID)){
                    this.SharedWithMe.push(workout);
                }
            }
            for(let k = 0; k < results.shared.goals.length; k++){
                const goal = {
                    type: "Goal",
                    post: {...results.shared.goals[k]}
                };
                if(!this.SharedWithMe.filter(x => x.type == "Goal").some(x => x.GID == goal.GID)){
                    this.SharedWithMe.push(goal);
                }
            }
        }
    },
    async approveFriend(userID){
        const results = await sjFetch('/social/approveFriend', {friendID: userID});
        if(results){
            for(let i = 0; i < results.requests.length; i++){
                const f = {
                    name: results.requests[i].name,
                    email: results.requests[i].email,
                    userID: results.requests[i].userID,
                    ID: results.requests[i].ID
                };
                if(!this.FriendRequests.some(x => x.ID == f.ID)){
                    this.FriendRequests.push(f);
                }
            }
            const approved = this.FriendRequests.find(x => x.userID == userID);
            const index = this.FriendRequests.indexOf(approved);
            this.FriendRequests.splice(index, 1);
            return {newFriend: results.newFriend};
        }
        else throw Error("Error trying to approve friend");
    },
    async requestFriend(userID){
        const results = await sjFetch('/social/requestFriend', {friendID: userID});
        if(results){
            for(let i = 0; i < results.requests.length; i++){
                const f = {
                    name: results.requests[i].name,
                    email: results.requests[i].email,
                    userID: results.requests[i].userID,
                    ID: results.requests[i].ID
                };
                if(!this.FriendRequests.some(x => x.ID == f.ID)){
                    this.FriendRequests.push(f);
                }
            }
            return {requestedFriend: results.requestedFriend};
        }
        else throw Error("Error trying to request friend");
    }
}