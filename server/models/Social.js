const User = require('./Users').User;
const users = require('./Users');
const planner = require('./Plan');

//stores friendlists as {UserID: 0, Friends: [1, 4, 3]} where Friends is a list of friends' UserIDs
const UserFriends = [];

//stores pending friend requests as {UserID: 0, Requests: [1, 2, 3]} where Requests is a list of UserIDs who have requested to be friends
const FriendRequests = [];
let requestID = 1;

async function shareItem(userID, itemType, itemID){
    const user = await User.findOne({UserID: userID});
    const friends = user.Friends;
    if(itemType == "Goal"){
        const goal = user.Goal.find(x => x._id == itemID);
        for(let i = 0; i < friends.length; i++){
            if(!goal.Shared.includes(friends[i])){
                goal.Shared.push(friends[i]);
            }
        }
        await user.save();
        return true;
    }
    else if(itemType == "Workout"){
        const workout = user.Workouts.find(x => x._id == itemID);
        for(let i = 0; i < friends.length; i++){
            if(!workout.Shared.includes(friends[i])){
                workout.Shared.push(friends[i]);
            }
        }
        await user.save();
        return true;
    }
    else{
        return false;
    }
}

async function getShared(userID){
    const hasGoalsShared = await User.find({"Goal.Shared": userID}).select("Name Goal");
    const hasWorkoutsShared = await User.find({"Workouts.Shared": userID}).select("Name Workouts");
    const goals = [];
    const workouts = [];
    for(let i = 0; i < hasGoalsShared.length; i++){
        const allgoals = hasGoalsShared[i].Goal.filter(x => x.Shared.includes(userID));
        const name = hasGoalsShared[i].Name;
        for(let j = 0; j < allgoals.length; j++){
            const goal = allgoals[j]._doc;
            goal.userName = name;
            goals.push(goal);
        }
    }
    for(let i = 0; i < hasWorkoutsShared.length; i++){
        const allworkouts = hasWorkoutsShared[i].Workouts.filter(x => x.Shared.includes(userID));
        const name = hasWorkoutsShared[i].Name;
        for(let j = 0; j < allworkouts.length; j++){
            const workout = allworkouts[j]._doc;
            workout.userName = name;
            workouts.push(workout);
        }
    }
    console.log("filtered goals: ", goals);
    console.log("filtered workouts: ", workouts);
    return {
        goals: goals,
        workouts: workouts
    };
}

async function getFriendRequests(userID){
    const results = await User.findOne({UserID: userID}, "FriendRequests");
    const requesters = [];
    for(let i = 0; i < results.FriendRequests.length; i++){
        const requester = await users.GetUser(results.FriendRequests[i]);
        requesters.push({Name: requester.Name, Email: requester.Email, UserID: requester.UserID});
    }
    
    return {requests: requesters};
}

async function requestFriend(userID, friendID){
    const user = await User.findOne({UserID: friendID});
    if(!user.FriendRequests.includes(userID)){
        user.FriendRequests.push(userID);
    }
    else throw Error("You have already requested that person as a friend!");
    await user.save();
    return await getFriendRequests(userID);
}

async function approveFriend(userID, friendID){
    await addFriend(userID, friendID);
    await addFriend(friendID, userID);
    return await getFriendRequests(userID);
}

async function addFriend(userID, friendID){
    const user = await User.findOne({UserID: userID});
    if(!user.Friends.includes(friendID)){
        user.Friends.push(friendID);
    }
    if(user.FriendRequests.includes(friendID)){
        const index = user.FriendRequests.find(x => x == friendID);
        user.FriendRequests.splice(index, 1);
    }
    await user.save();
}

async function getAllFriends(userID){
    const friendIDs = await User.findOne({UserID: userID}, "Friends");
    console.log("list of friends in getallfriends ", friendIDs);
    const friends = [];
    for(let i = 0; i < friendIDs.Friends.length; i++){
        const friend = await users.GetUser(friendIDs.Friends[i]);
        friends.push(friend);
    }
    
    return friends;
}

module.exports = {
    getFriendRequests, approveFriend, requestFriend, getShared, getAllFriends, shareItem
}