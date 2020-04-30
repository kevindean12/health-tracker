<template>
    <div class="container">
        <div class="title is-4 has-text-centered"> {{congrats}} </div>
        <div class="title is-2">My Workouts</div>
        <div class="box">
            <div class="columns">
                <div class="column"></div>
                <div class="column">
                    <audio controls @play="getTrackTimePlay" @pause="getTrackTimePause"  :src="currentAudio" class="has-text-centered">
                        Sorry, there's supposed to be an audio player here but your browser doesn't support HTML5!
                    </audio>
                    <div class="panel is-link">
                        <a v-for="(pod, i) in availablePodcasts" :key="i" href="#" @click="updateTrack(i)" class="panel-block">
                            <img :src="pod.coverArt" :alt="pod.title" class="image is-32x32">
                            {{pod.episodeTitle}}
                        </a>
                    </div>
                </div>
                <div class="column"></div>
            </div>
            
        </div>
        <div class="card" v-for="(workout, i) in Planner.WorkoutSchedule" :key="i">
            <div v-for="(exercise, j) in workout.Exercises" :key="j">
                <header class="card-header">
                    <span class="card-header-title">
                    Exercise {{j+1}} 
                    </span>
                </header>
                <div class="card-content">
                    <span class="title is-4 is-pulled-right"> {{exercise.time}} minutes remaining </span>
                    <div class="columns">
                        <div class="column">
                            <span class="title is-4"> {{exercise.name}} </span>
                            <span class="icon fa-lg">
                                <i v-if="exercise.category =='Strength'" class="fas fa-dumbbell"></i>
                                <i v-else class="fas fa-running"></i>
                            </span>
                            <p class="content">
                                {{exercise.description}}
                            </p>
                        </div>
                        <div class="column">
                            
                            <!-- <div v-for="(pod, k) in workout.Podcasts" :key="k" class="is-inline-block">
                                <img :src="pod.coverArt" :alt="pod.title" class="image is-64x64">
                                <p>{{pod.episodeTitle}}</p>
                                <audio @play="getTrackTimePlay" @pause="getTrackTimePause(k)" controls :src="pod.audio"></audio>
                            </div> -->
                            <button @click="selectExercise(j)" class="button">Work out and listen!</button>
                            <p v-if="currentExercise == j" class="content is-success">
                                Click on a podcast in the player, and hit play! Your time spent listening will update the time left in this exercise automatically when you stop the podcast player.
                            </p>

                        </div>
                    </div>
                </div>
                <footer class="card-footer">
                    <div class="dropdown" :id="j">
                        <div class="dropdown-trigger">
                            <button class="button" @click="makeActive(j)" aria-haspopup="true" aria-controls="dropdown-menu2">
                            <span>Update Progress</span>
                            <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            </button>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu2" role="menu">
                            <div class="dropdown-content">
                                <div class="dropdown-item">
                                    Completed <input type="number" class="input" placeholder="0" v-model="completed"> minutes. 
                                </div>
                                <button @click.prevent="updateExercise(workout.WID, j)" class="button">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
  </div>
</template>

<script>
//import {WorkoutSchedule} from "../models/Log.js";
//import {CurrentGoal} from "../models/Planner.js";
import Planner from "../models/Planner.js"
export default {
    name: 'ExerciseLog',
    data: () => ({
        Planner,
        completed: 0,
        trackTimePlay: 0,
        trackTimeStop: 0,
        currentAudio: "",
        currentExercise: -1,
        congrats: ""
    }),
    computed: {
        availablePodcasts: function(){
            const uniquePods = [];
            for(let i = 0; i < Planner.WorkoutSchedule.length; i++){
                for(let j = 0; j < Planner.WorkoutSchedule[i].Podcasts.length; j++){
                    const pod = Planner.WorkoutSchedule[i].Podcasts[j];
                    if(!uniquePods.map(x => x.episodeTitle).includes(pod.episodeTitle)){
                        uniquePods.push(pod);
                    }
                }
            }
            return uniquePods;
        }
    },
    methods: {
        makeActive(id) {
            const exerciseCard = document.getElementById(id);
            if(exerciseCard.classList.contains("is-active")){
                exerciseCard.classList.remove("is-active");
            }
            else {
                exerciseCard.classList.add("is-active");
            }
        },
        async updateExercise(workoutID, jExercise){
            const progress = await Planner.updateExerciseProgress(workoutID, jExercise, this.completed);
            console.log("Progress object",progress);
            this.completed = 0;
            let congrats = "";
            if(progress.Exercise){
                congrats += "You completed an exercise!";
            }
            if(progress.Workout){
                congrats += " You completed a workout!";
            }
            if(progress.Goal){
                congrats += " You completed your goal!";
            }
            this.congrats = congrats;
        },
        getTrackTimePlay(){
            this.trackTimePlay = Math.floor(document.getElementsByTagName("audio")[0].currentTime/60); 
        },
        getTrackTimePause(){ 
            this.trackTimeStop = Math.floor(document.getElementsByTagName("audio")[0].currentTime/60);
            const difference = this.trackTimeStop - this.trackTimePlay;
            if(difference > 0){
                this.completed += difference;
                this.updateExercise(this.currentExercise);
            }
        },
        updateTrack(index){
            this.currentAudio = this.availablePodcasts[index].audio;
        },
        selectExercise(i){
            console.log("current exercise is now: " + i);
            this.currentExercise = i;
        }
    }
}
</script>

<style>

</style>