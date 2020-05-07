import sjFetch from "./sjFetch";

export default {
    Exercises: [],
    UserPlaylist: [],
    CurrentGoals: [],
    async share(itemInfo){
        const response = await sjFetch('/social/share', {type: itemInfo.type, ID: itemInfo.ID});
        return response;
    },
    async createGoal(cardio, strength, days){
        try{
            const response = await sjFetch('/plan/creategoal', {
                cardioMinutes: cardio,
                strengthMinutes: strength,
                days: days
            });
            this.CurrentGoals = response.goals;
        } catch(error) {
            console.error(error);
        }
        
    },
    async searchPodcasts(keywords, page){
        const results = await sjFetch('/plan/podsearch', {keywords: keywords, page: page});
        return results;
    },
    async start(){
        try{
            const response = await sjFetch('/plan');
            this.Exercises = response.Exercises;
            this.UserPlaylist = response.UserPlaylist;
            this.WorkoutSchedule = response.Workouts;
            this.CurrentGoals = response.Goals;
        } catch(error) {
            console.error(error.message);
        }
        
        
        console.log(this.Exercises, this.UserPlaylist, this.WorkoutSchedule, this.CurrentGoals);
    },
    WorkoutSchedule: [],
    async addNewWorkout(workoutSchedule){
        try{
            const response = await sjFetch('/plan/submitWorkout', {workout: workoutSchedule});
            for(let i = 0; i < response.length; i++){
                this.WorkoutSchedule.push({
                    Exercises: response[i].Exercises,
                    Podcasts: response[i].Podcasts,
                    _id: response[i]._id,
                    createdAt: response[i].createdAt
                });
            }
        } catch(error) {
            console.error(error.message);
        }
        
    },
    async addToPlaylist(podcast){
        try{
            const response = await sjFetch('/plan/submitpod', {podcast: podcast});
            this.UserPlaylist = JSON.parse(JSON.stringify(response));
        } catch(error) {
            console.error(error.message);
        }
        
    },
    async removeFromPlaylist(episodeTitle){
        try{
            const response = await sjFetch('/plan/deletepod', {episodeTitle: episodeTitle});
            this.UserPlaylist = JSON.parse(JSON.stringify(response));
        } catch(error) {
            console.error(error.message);
        }
    },
    async updateExerciseProgress(whichGoal, workoutID, jExercise, timeCompleted){
        try{
            const response = await sjFetch('/log/updateExercise', {
                GID: whichGoal,
                workoutID: workoutID,
                exerciseIndex: jExercise,
                minutesCompleted: timeCompleted
            });
    
            this.WorkoutSchedule = JSON.parse(JSON.stringify(response.workouts));
            return response;
        } catch(error) {
            console.error(error);
        }
        
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
        return response;
    },
    async deleteExercise(name){
        await sjFetch('/admin/deleteExercise', {name: name});
    },
    async editExercise(name, updated){
        const response = await sjFetch('/admin/editExercise', {name: name, updated: updated});
        return response;
    }
}