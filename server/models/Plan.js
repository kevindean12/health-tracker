const users = require('./Users');
const unirest = require('unirest');
const token = require('../models/listenapi');

// class Exercise {
//     constructor(name, description, category, mins){
//         this.name = name;
//         this.description = description;
//         this.category = category;
//         this.time = mins;
//     }
// }

// class Goal{
//     constructor(cardioMinutes, strengthMinutes, days){
//         this.cardioMinutes = cardioMinutes;
//         this.strengthMinutes = strengthMinutes;
//         this.days = days;
//     }
// }


// class Podcast{
//     constructor(title, episodeTitle, durationSeconds, audio){
//         this.title = title;
//         this.episodeTitle = episodeTitle;
//         this.duration = durationSeconds;
//         this.remaining = durationSeconds;
//         this.coverArt = '';
//         this.audio = audio;
//         this.next = null;
//         this.prev = null;
//     }
// }



const pod1 = {title: "FiveThirtyEight Politics", episodeTitle: "What's At Stake On Super Tuesday", duration: 3332, audio: "https://www.listennotes.com/e/p/7bf87744732544d2aed2ca6a7be177c6/"};
const pod2 = {title: "Football Weekly", episodeTitle: "Liverpool's shock loss, more City silverware and German banners - Football Weekly", duration: 4000, audio: "https://www.listennotes.com/e/p/2f1a906c34464548938fcf66a098b32f/"};
pod1.coverArt = "https://cdn-images-1.listennotes.com/podcasts/fivethirtyeight-politics-fivethirtyeight-OhBumQJlDAT-xEJ8lSGcCvd.300x300.jpg";
pod2.coverArt = "https://cdn-images-1.listennotes.com/podcasts/football-weekly-the-guardian-cH8YOyjI9xq.300x300.jpg";

//Arrays to be replaced by DB
const UserPlaylists = [{UserID: 1, Playlist: [pod1, pod2]}];

//stores the workout schedule for a user as {UserID: 0, Workouts: []}
const UserWorkouts = [];

//stores each user's exercise goal as {UserID: 0, Cardio: 100, Strength: 50, Days: 5}
const UserGoals = [];

//stores record of user's completed exercises as {UserID: 0, Goals: 2, Jog: 128, Pushups: 45, ...}
//Goals: # of user-set goals completed
//each exercise is number of minutes completed
const UserCompleted = [];

function SubmitWorkout(userID, workout) {
    if(UserWorkouts.some(x => x.UserID == userID)){
        // const workoutIter = workout.values();
        // const workoutList = UserWorkouts.find(x => x.UserID == userID).Workouts;
        // for(const w of workoutIter){workoutList.push(w);}
        UserWorkouts.find(x => x.UserID == userID).Workouts.push(JSON.parse(JSON.stringify(workout)));
    }
    else {
        UserWorkouts.push({UserID: userID, Workouts: [workout]});
    }
    
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

//TODO make this actually store in UserGoals by UserID
function createGoal(cardio, strength, days){
    const goal = {
        cardioMinutes: cardio*days,
        strengthMinutes: strength*days,
        days: days
    };  
    return goal;
}

function exerciseProgress(userID, iWorkout, jExercise, completed){
    const exercise = UserWorkouts.find(x => x.UserID == userID).Workouts[iWorkout].Exercises[jExercise];
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
        const workout = UserWorkouts.find(x => x.UserID == userID).Workouts[iWorkout];
        workout.Exercises.splice(jExercise, 1);
    }

    const finishedWorkout = (UserWorkouts.find(x => x.UserID == userID).Workouts[iWorkout].Exercises.length == 0);
    if(finishedWorkout){
        UserWorkouts.find(x => x.UserID == userID).Workouts.splice(iWorkout, 1);
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
    UserGoals: UserGoals, UserCompleted: UserCompleted
};