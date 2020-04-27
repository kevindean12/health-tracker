import sjFetch from "./sjFetch";
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



// export const Exercises = [
//     new Exercise("Jog", "A moderately paced run.", "Cardio", 15),
//     new Exercise("Pushups", "Arm and chest workout using only body weight.", "Strength", 10)
// ];

//fetch episodes using ListenNotes
//duration is in seconds (and comes that way from ListenNotes)






export default {
    Exercises: [],
    UserPlaylist: [],
    async createGoal(cardio, strength, days){
        const response = await sjFetch('/plan/creategoal', {
            cardioMinutes: cardio*days,
            strengthMinutes: strength*days,
            days: days
        });
        return response;
    },
    async searchPodcasts(keywords, page){
        //TODO sanitize inputs
        const results = await sjFetch('/plan/podsearch', {keywords: keywords, page: page});
        return results;
    },
    async start(){
        this.Exercises = [];
        this.UserPlaylist = [];
        this.WorkoutSchedule = [];
        const response = await sjFetch('/plan');
        for(let i = 0; i < response.Exercises.length; i++){
            this.Exercises.push(response.Exercises[i]);
        }
        for(let i = 0; i < response.UserPlaylist.length; i++){
            this.UserPlaylist.push(response.UserPlaylist[i]);
        }
        for(let i = 0; i < response.Workouts.length; i++){
            this.WorkoutSchedule.push(response.Workouts[i]);
        }
        // this.Exercises = JSON.parse(JSON.stringify(response.Excercises));
        // this.UserPlaylist = JSON.parse(JSON.stringify(response.UserPlaylist));
        // this.WorkoutSchedule = JSON.parse(JSON.stringify(response.Workouts));
        console.log(this.Exercises, this.UserPlaylist, this.WorkoutSchedule);
    },
    WorkoutSchedule: [],
    async createNewWorkout(workoutSchedule){
        const workouts = await sjFetch('/plan/submitWorkout', {workouts: workoutSchedule});
        return workouts;
    },
    async addToPlaylist(workoutPodcasts){
        const playlist = await sjFetch('/plan/submitpod');
        return playlist;
    }
}