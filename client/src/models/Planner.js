import sjFetch from "./sjFetch";

export default {
    Exercises: [],
    UserPlaylist: [],
    CurrentGoal: {},
    async createGoal(cardio, strength, days){
        const response = await sjFetch('/plan/creategoal', {
            cardioMinutes: cardio,
            strengthMinutes: strength,
            days: days
        });
        this.CurrentGoal = {
            Cardio: response.Cardio,
            Strength: response.Strength,
            Days: response.Days
        };
    },
    async searchPodcasts(keywords, page){
        //TODO sanitize inputs
        const results = await sjFetch('/plan/podsearch', {keywords: keywords, page: page});
        return results;
    },
    async start(){
        const response = await sjFetch('/plan');
        this.Exercises = JSON.parse(JSON.stringify(response.Exercises));
        this.UserPlaylist = JSON.parse(JSON.stringify(response.UserPlaylist));
        this.WorkoutSchedule = JSON.parse(JSON.stringify(response.Workouts));
        console.log(this.Exercises, this.UserPlaylist, this.WorkoutSchedule);
    },
    WorkoutSchedule: [],
    async addNewWorkout(workoutSchedule){
        const response = await sjFetch('/plan/submitWorkout', {workout: workoutSchedule});
        console.log("response from adding workouts:", response);
        this.WorkoutSchedule = JSON.parse(JSON.stringify(response));
    },
    async addToPlaylist(podcast){
        const response = await sjFetch('/plan/submitpod', {podcast: podcast});
        this.UserPlaylist = JSON.parse(JSON.stringify(response));
    },
    async updateExerciseProgress(workoutID, jExercise, timeCompleted){
        const response = await sjFetch('/log/updateExercise', {
            workoutIndex: workoutID,
            exerciseIndex: jExercise,
            minutesCompleted: timeCompleted
        });

        this.WorkoutSchedule = JSON.parse(JSON.stringify(response.workouts));
        return response.progress;
    }
}