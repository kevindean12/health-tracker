import { token } from "../models/listenapi";
const unirest = require('unirest');
export class Exercise {
    constructor(name, description, category, mins){
        this.name = name;
        this.description = description;
        this.category = category;
        this.time = mins;
    }
}

export class Goal{
    constructor(cardioMinutes, strengthMinutes, days, exercises){
        this.cardioMinutes = cardioMinutes;
        this.strengthMinutes = strengthMinutes;
        this.days = days;
        this.exercises = exercises;
    }
}

// export class Workout {
//     constructor(exercises, playlist){
//         this.playlist = playlist;
//         this.exercises = exercises;
//     }

//     get timeMins(){
//         let count = 0;
//         for(let i = 0; i < this.exercises.length; i++){
//             count += this.exercises[i].time;
//         }
//         return count;
//     }
// }

//a node for a linked list containing information about the podcast episode
export class Podcast{
    constructor(title, episodeTitle, durationSeconds){
        this.title = title;
        this.episodeTitle = episodeTitle;
        this.duration = durationSeconds;
        this.remaining = durationSeconds;
        this.coverArt = '';
        this.next = null;
        this.prev = null;
    }
}



export const Exercises = [
    new Exercise("Jog", "A moderately paced run.", "Cardio", 15),
    new Exercise("Pushups", "Arm and chest workout using only body weight.", "Strength", 10)
];

//fetch episodes using ListenNotes
//duration is in seconds (and comes that way from ListenNotes)
export const UserPlaylist = [
    new Podcast("FiveThirtyEight Politics", "What's At Stake On Super Tuesday", 3332),
    new Podcast("Football Weekly", "Liverpool's shock loss, more City silverware and German banners - Football Weekly", 4000)
];

export const CurrentGoal = new Goal(70, 50, 5, Exercises);

export async function searchPodcasts(keywords, page){
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