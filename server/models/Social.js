const users = require('./Users');
const planner = require('./Plan');

//stores friendlists as {UserID: 0, Friends: [1, 4, 3]} where Friends is a list of friends' UserIDs
const UserFriends = [];

//stores pending friend requests as {UserID: 0, Requests: [1, 2, 3]} where Requests is a list of UserIDs who have requested to be friends
const FriendRequests = [];
let requestID = 1;

function shareItem(userID, itemType, itemID){
    const friends = UserFriends.find(x => x.UserID == userID);
    if(!friends){
        return true;
    }
    if(itemType == "Goal"){
        const goal = planner.UserGoals.find(x => x.UserID == userID);
        for(let i = 0; i < friends.Friends.length; i++){
            const friend = friends.Friends[i];
            if(!goal.Shared.includes(friend)){
                goal.Shared.push(friend);
            }
        }
        return true;
    }
    else if(itemType == "Workout"){
        const workout = planner.UserWorkouts.find(x => x.WID == itemID);
        for(let i = 0; i < friends.Friends.length; i++){
            const friend = friends.Friends[i];
            if(!workout.Shared.includes(friend)){
                workout.Shared.push(friend);
            }
        }
        return true;
    }
    else{
        return false;
    }
}

function getShared(userID){
    const goals = planner.UserGoals.filter(x => x.Shared.includes(userID));
    for(let i = 0; i < goals.length; i++){
        goals[i].userName = users.GetUser(goals[i].UserID).Name;
    }
    const workouts = planner.UserWorkouts.filter(x => x.Shared.includes(userID));
    for(let i = 0; i < workouts.length; i++){
        workouts[i].userName = users.GetUser(workouts[i].UserID).Name;
    }
    return {
        goals: goals,
        workouts: workouts
    };
}

function getFriendRequests(userID){
    const results = FriendRequests.find(x => x.UserID == userID);
    const requesters = [];
    if(results){
        for(let i = 0; i < results.Requests.length; i++){
            const user = users.GetUser(results.Requests[i].userID);
            requesters.push({name: user.Name, email: user.Email, userID: user.UserID, ID: results.Requests[i].ID});
        }
    }
    return {requests: requesters};
}

function getFriend(userID, friendID){
    const user = UserFriends.find(x => x.UserID == userID);
    const friend = user.Friends.find(x => x == friendID);
    if(friend){ //all friends have a nonzero positive userID: only admin has UserID 0
        return {friend: users.GetUser(friendID)};
    }
    else{
        throw Error("Friend not found");
    }
    
}

function requestFriend(userID, friendID){
    const user = FriendRequests.find(x => x.UserID == friendID);
    if(user){
        if(!user.Requests.find(x => x.userID == userID)){
            user.Requests.push({userID: userID, ID: requestID++});
        }
    }
    else{
        FriendRequests.push({
            UserID: friendID,
            Requests: [{userID: userID, ID: requestID++}]
        });
    }
    console.log(FriendRequests);
    return getFriendRequests(userID);
}

function approveFriend(userID, friendID){
    addFriend(userID, friendID);
    addFriend(friendID, userID);
    completeFriendRequest(userID, friendID);
    completeFriendRequest(friendID, userID);
    console.log(UserFriends);
    console.log(FriendRequests);
    return getFriendRequests(userID);
}

function addFriend(userID, friendID){
    const results = UserFriends.find(x => x.UserID == userID);
    if(results){
        if(!results.Friends.some(x => x == friendID)){
            results.Friends.push(friendID);
        }
        
    }
    else{
        UserFriends.push({
            UserID: userID,
            Friends: [friendID]
        });
    }
}

function completeFriendRequest(userID, friendID){
    const userFR = FriendRequests.find(x => x.UserID == userID);
    if(userFR){
        const fRequest = userFR.Requests.find(x => x.userID == friendID);
        const index = userFR.Requests.indexOf(fRequest);
        userFR.Requests.splice(index, 1);
    }
}

function getAllFriends(userID){
    const user = UserFriends.find(x => x.UserID == userID);
    const friends = [];
    if(user){
        for(let i = 0; i < user.Friends.length; i++){
            friends.push({...users.GetUser(user.Friends[i])})
        }
    }
    return friends;
}

module.exports = {
    getFriendRequests, approveFriend, getFriend, requestFriend, getShared, getAllFriends, shareItem
}