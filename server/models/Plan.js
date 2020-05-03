const User = require('./Users').User;
const unirest = require('unirest');
const token = require('../models/listenapi').token;

const pod1 = {title: "FiveThirtyEight Politics", episodeTitle: "What's At Stake On Super Tuesday", duration: 3332, audio: "https://www.listennotes.com/e/p/7bf87744732544d2aed2ca6a7be177c6/"};
const pod2 = {title: "Football Weekly", episodeTitle: "Liverpool's shock loss, more City silverware and German banners - Football Weekly", duration: 4000, audio: "https://www.listennotes.com/e/p/2f1a906c34464548938fcf66a098b32f/"};
pod1.coverArt = "https://cdn-images-1.listennotes.com/podcasts/fivethirtyeight-politics-fivethirtyeight-OhBumQJlDAT-xEJ8lSGcCvd.300x300.jpg";
pod2.coverArt = "https://cdn-images-1.listennotes.com/podcasts/football-weekly-the-guardian-cH8YOyjI9xq.300x300.jpg";

//Arrays to be replaced by DB
const UserPlaylists = [{UserID: 1, Playlist: [pod1, pod2]}];

//stores the workout schedule for a user as {UserID: 0, Exercises: [], Podcasts: [], Shared: [], WID: 1}
const UserWorkouts = [];
let workoutID = 1;

//stores each user's exercise goal as {UserID: 0, Cardio: 100, Strength: 50, Days: 5, Shared: [], GID: 2}
const UserGoals = [];
let goalID = 1;

//stores record of user's completed exercises as {UserID: 0, Goals: 2, Jog: 128, Pushups: 45, ...}
//Goals: # of user-set goals completed
//each exercise is number of minutes completed
const UserCompleted = [];

async function SubmitWorkout(userID, workout) {
    const user = await User.findOne({UserID: userID});
    user.Workouts.push({
        Exercises: workout.Exercises,
        Podcasts: workout.Podcasts,
    })
    // UserWorkouts.push({
    //     UserID: userID,
    //     Exercises: workout.Exercises,
    //     Podcasts: workout.Podcasts,
    //     Shared: [],
    //     WID: workoutID++
    // });
    return await user.save();
}

function addToPlaylist(userID, pod){
    if(UserPlaylists.some(x => x.UserID == userID)){
        UserPlaylists.find(x => x.UserID == userID).Playlist.push(pod);
    }
    else {
        UserPlaylists.push({UserID: userID, Playlist: [pod]});
    }
}

async function searchPodcasts(keywords, page){
    //TODO need to sanitize user input first...
    const terms = keywords.split(' ');
    if(terms.length > 7) throw Error('Too many search terms');
    let input = '';
    for(let i = 0; i < terms.length-1; i++){
        input += `${terms[i]}%20`;
    }
    input += terms[terms.length-1];
    let response = await unirest.get(`https://listen-api.listennotes.com/api/v2/search?q=${input}&sort_by_date=0&type=episode&offset=${page}&only_in=title%2Cdescription&language=English&safe_mode=0`)
        .header('X-ListenAPI-Key', token);
    return await response.toJSON();
}


function createGoal(userID, cardio, strength, days){
    const goal = UserGoals.find(x => x.UserID == userID);
    if(goal){
        goal.Cardio = cardio;
        goal.Strength = strength;
        goal.Days = days;
        return {...goal, UserID: undefined};
    }
    else {
        const newGoal = {
            UserID: userID,
            Cardio: cardio*days,
            Strength: strength*days,
            Days: days,
            Shared: [],
            GID: goalID++
        };
        UserGoals.push(newGoal);
        return {...newGoal, UserID: undefined};
        
    }
}

async function getFullUser(userID){
    return await User.findOne({UserID: userID});
}

function exerciseProgress(userID, iWorkout, jExercise, completed){
    const exercise = UserWorkouts.find(x => x.WID == iWorkout).Exercises[jExercise];
    exercise.time -= completed;
    
    const progress = UserCompleted.find(x => x.UserID == userID);
    if(progress){
        progress[exercise.name] += completed;
    }
    

    const goal = UserGoals.find(x => x.UserID == userID);
    let finishedGoal = false;
    if(goal){
        goal[exercise.category] -= completed;
        finishedGoal = (goal.Cardio <= 0 && goal.Strength <= 0);
        if(finishedGoal){
            progress.Goals++;
        }
    }
    

    const finishedExercise = (exercise.time <= 0);
    if(finishedExercise){
        const workout = UserWorkouts.find(x => x.WID == iWorkout);
        workout.Exercises.splice(jExercise, 1);
    }

    const finishedWorkout = (UserWorkouts.find(x => x.WID == iWorkout).Exercises.length == 0);
    if(finishedWorkout){
        const emptyWorkout = UserWorkouts.find(x => x.WID == iWorkout);
        const index = UserWorkouts.indexOf(emptyWorkout);
        UserWorkouts.splice(index, 1);
    }

    return {
        Exercise: finishedExercise,
        Workout: finishedWorkout,
        Goal: finishedGoal
    };
}

module.exports = {
    UserWorkouts: UserWorkouts, SubmitWorkout, searchPodcasts,
    createGoal, UserPlaylists: UserPlaylists, addToPlaylist, exerciseProgress,
    UserGoals: UserGoals, UserCompleted: UserCompleted, getFullUser
};