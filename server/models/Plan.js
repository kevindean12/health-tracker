const users = require('./Users');
const unirest = require('unirest');
const token = require('../models/listenapi');
class Exercise {
    constructor(name, description, category, mins){
        this.name = name;
        this.description = description;
        this.category = category;
        this.time = mins;
    }
}

class Goal{
    constructor(cardioMinutes, strengthMinutes, days){
        this.cardioMinutes = cardioMinutes;
        this.strengthMinutes = strengthMinutes;
        this.days = days;
    }
}

//a node for a linked list containing information about the podcast episode
class Podcast{
    constructor(title, episodeTitle, durationSeconds, audio){
        this.title = title;
        this.episodeTitle = episodeTitle;
        this.duration = durationSeconds;
        this.remaining = durationSeconds;
        this.coverArt = '';
        this.audio = audio;
        this.next = null;
        this.prev = null;
    }
}



const pod1 = new Podcast("FiveThirtyEight Politics", "What's At Stake On Super Tuesday", 3332, "https://www.listennotes.com/e/p/7bf87744732544d2aed2ca6a7be177c6/");
const pod2 = new Podcast("Football Weekly", "Liverpool's shock loss, more City silverware and German banners - Football Weekly", 4000, "https://www.listennotes.com/e/p/2f1a906c34464548938fcf66a098b32f/");
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
//needs to construct an object that includes userID
function SubmitWorkout(workouts) {
    UserWorkouts.push(workouts);
    return UserWorkouts;
}

function addToPlaylist(userID, pod){
    //adds to user's playlist
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
        cardioMinutes: cardio*numDays,
        strengthMinutes: strength*numDays,
        days: numDays
    };  
    return goal;
}


module.exports = {
    Exercise, Goal, Podcast, 
    UserWorkouts, NewSession, SubmitWorkout, searchPodcasts,
    createGoal, UserPlaylists, addToPlaylist
};