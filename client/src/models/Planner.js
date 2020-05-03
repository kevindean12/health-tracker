import sjFetch from "./sjFetch";

export default {
    Exercises: [],
    UserPlaylist: [],
    CurrentGoals: [],
    async share(itemInfo){
        const response = await sjFetch('/social/share', {type: itemInfo.type, ID: itemInfo.ID});
        return response.message;
    },
    async createGoal(cardio, strength, days){
        const response = await sjFetch('/plan/creategoal', {
            cardioMinutes: cardio,
            strengthMinutes: strength,
            days: days
        });
        this.CurrentGoals = response.goals;
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
    },
    async createExercise(name, description, category, time){
        const response = await sjFetch('/admin/addExercise', {
            newExercise: {
                name: name,
                description: description,
                category: category,
                time: time
            }
        });
        return response.added;
    },
    async deleteExercise(name){
        await sjFetch('/admin/deleteExercise', {name: name});
    },
    async editExercise(name, updated){
        const response = await sjFetch('/admin/editExercise', {name: name, updated: updated});
        return response.updated;
    }
}