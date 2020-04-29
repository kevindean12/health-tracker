const users = require('./Users');
const planner = require('./Plan');

//stores friendlists as {UserID: 0, Friends: [1, 4, 3]} where Friends is a list of friends' UserIDs
const UserFriends = [];

//stores pending friend requests as {UserID: 0, Requests: [1, 2, 3]} where Requests is a list of UserIDs who have requested to be friends
const FriendRequests = [];

function getFriendRequests(userID){
    const results = FriendRequests.find(x => x.UserID == userID);
    const requesters = [];
    if(results){
        for(let i = 0; i < results.Requests.length; i++){
            const user = users.GetUser(results.Requests[i]);
            requesters.push({name: user.Name, email: user.Email, userID: user.UserID});
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
        if(!user.Requests.find(x => x == userID)){
            user.Requests.push(userID);
        }
    }
    else{
        FriendRequests.push({
            UserID: friendID,
            Requests: [userID]
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
        const index = userFR.Requests.indexOf(friendID);
        userFR.Requests.splice(index, 1);
    }
}

module.exports = {
    getFriendRequests, approveFriend, getFriend, requestFriend
}