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
const UserPlaylists = [{UserID: 0, Playlist: [pod1, pod2]}];
//stores the workout schedule for a user as {UserID: 0, WorkoutSchedule: []}
const UserWorkouts = [];

function NewSession(userID) {
    const user = users.GetUser(userID);
    return MyWorkouts;
}

function SubmitWorkout(userID, workouts) {
    if(UserWorkouts.some(x => x.UserID == userID)){
        const workoutIter = workouts.values();
        const workoutList = UserWorkouts.find(x => x.UserID == userID).WorkoutSchedule;
        for(const w of workoutIter){workoutList.push(w);}
    }
    else {
        UserWorkouts.push({UserID: userID, WorkoutSchedule: workouts});
    }
    
    return UserWorkouts.find(x => x.UserID == userID);
}

function addToPlaylist(userID, pod){
    if(UserPlaylists.some(x => x.UserID == userID)){
        UserPlaylists.find(x => x.UserID == userID).Playlist.push(pod);
    }
    else {
        UserPlaylists.push({UserID: userID, Playlist: [pod]});
    }
    return UserPlaylists.find(x => x.UserID == userID);
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

function createGoal(cardio, strength, days){
    const goal = {
        cardioMinutes: cardio*days,
        strengthMinutes: strength*days,
        days: days
    };  
    return goal;
}


module.exports = {
    UserWorkouts, NewSession, SubmitWorkout, searchPodcasts,
    createGoal, UserPlaylists, addToPlaylist
};