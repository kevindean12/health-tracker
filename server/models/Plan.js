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

const MyWorkouts = [];

function NewSession(userID) {
    const user = users.GetUser(userID);
    return MyWorkouts;
}

function SubmitWorkout(workout) {
    MyWorkouts.push(workout);
    return MyWorkouts;
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

module.exports = {
    Exercise, Goal, Podcast, 
    MyWorkouts, NewSession, SubmitWorkout, searchPodcasts
};