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
        const results = await sjFetch('/social');
        console.log("results from start social: ", results);
        this.FriendRequests = JSON.parse(JSON.stringify(results.requests));
        this.Friends = JSON.parse(JSON.stringify(results.friends));
        this.SharedWithMe = JSON.parse(JSON.stringify(results.shared));
        // if(results){
        //     for(let i = 0; i < results.requests.length; i++){
        //         const f = {
        //             Name: results.requests[i].Name,
        //             Email: results.requests[i].Email,
        //             UserID: results.requests[i].UserID,
        //         };
        //         if(!this.FriendRequests.some(x => x.UserID == f.UserID)){
        //             this.FriendRequests.push(f);
        //         }
        //     }
        //     for(let j = 0; j < results.shared.workouts.length; j++){
        //         const workout = {
        //             type: "Workout",
        //             post: {...results.shared.workouts[j]}
        //         };
        //         if(!this.SharedWithMe.filter(x => x.type == "Workout").some(x => x._id == workout.post._id)){
        //             this.SharedWithMe.push(workout);
        //         }
        //     }
        //     for(let k = 0; k < results.shared.goals.length; k++){
        //         const goal = {
        //             type: "Goal",
        //             post: {...results.shared.goals[k]}
        //         };
        //         if(!this.SharedWithMe.filter(x => x.type == "Goal").some(x => x.GID == goal.post._id)){
        //             this.SharedWithMe.push(goal);
        //         }
        //     }
        //     for(let i = 0; i < results.friends.length; i++){
        //         const friend = {
        //             name: results.friends[i].Name,
        //             userID: results.friends[i].UserID
        //         };
        //         if(!this.Friends.some(x => x.userID == friend.userID)){
        //             this.Friends.push(friend);
        //         }
        //     }
        // }
    },
    async approveFriend(userID){
        const results = await sjFetch('/social/approveFriend', {friendID: userID});
        this.FriendRequests = results.requests;
        return {newFriend: results.newFriend};
        // if(results){
        //     for(let i = 0; i < results.requests.length; i++){
        //         const f = {
        //             Name: results.requests[i].Name,
        //             Email: results.requests[i].Email,
        //             UserID: results.requests[i].UserID
        //         };
        //         if(!this.FriendRequests.some(x => x.UserID == f.UserID)){
        //             this.FriendRequests.push(f);
        //         }
        //     }
        //     const approved = this.FriendRequests.find(x => x.userID == userID);
        //     const index = this.FriendRequests.indexOf(approved);
        //     this.FriendRequests.splice(index, 1);
        //     return {newFriend: results.newFriend};
        // }
        // else throw Error("Error trying to approve friend");
    },
    async requestFriend(userID){
        const results = await sjFetch('/social/requestFriend', {friendID: userID});
        if(results){
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
        }
        else throw Error("Error trying to request friend");
    }
}