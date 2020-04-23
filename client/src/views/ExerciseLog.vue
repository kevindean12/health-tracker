<template>
    <div class="container">
        <div class="title is-2">My Workouts This Week</div>
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
        <div class="card" v-for="(workout, i) in WorkoutSchedule" :key="i">
            <header class="card-header">
                <span class="card-header-title">
                Exercise {{i+1}} 
                </span>
            </header>
            <div class="card-content">
                 <span class="title is-4 is-pulled-right"> {{workout.exercise.time}} minutes remaining </span>
                <div class="columns">
                    <div class="column">
                        <span class="title is-4"> {{workout.exercise.name}} </span>
                        <span class="icon fa-lg">
                            <i v-if="workout.exercise.category =='Strength'" class="fas fa-dumbbell"></i>
                            <i v-else class="fas fa-running"></i>
                        </span>
                        <p class="content">
                            {{workout.exercise.description}}
                        </p>
                    </div>
                    <div class="column">
                        
                        <!-- <div v-for="(pod, i) in workout.podcasts" :key="i" class="is-inline-block">
                            <img :src="pod.coverArt" :alt="pod.title" class="image is-64x64">
                            <p>{{pod.episodeTitle}}</p>
                            <audio @play="getTrackTimePlay" @pause="getTrackTimePause(i)" controls :src="pod.audio"></audio>
                        </div> -->
                        <button @click="selectExercise(i)" class="button">Work out and listen!</button>
                        <p v-if="currentExercise == i" class="content is-success">
                            Click on a podcast in the player, and hit play! Your time spent listening will update the time left in this exercise automatically when you stop the podcast player.
                        </p>

                    </div>
                </div>
            </div>
            <footer class="card-footer">
                <div class="dropdown" :id="i">
                    <div class="dropdown-trigger">
                        <button class="button" @click="makeActive(i)" aria-haspopup="true" aria-controls="dropdown-menu2">
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
                            <button @click.prevent="selectExercise(i)" class="button">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
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
        WorkoutSchedule: Planner.WorkoutSchedule,
        completed: 0,
        trackTimePlay: 0,
        trackTimeStop: 0,
        currentAudio: "",
        currentExercise: -1
    }),
    computed: {
        availablePodcasts: () => {
            const uniquePods = [];
            for(let i = 0; i < WorkoutSchedule.length; i++){
                for(let j = 0; j < WorkoutSchedule[i].podcasts.length; j++){
                    const pod = WorkoutSchedule[i].podcasts[j];
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
        updateExercise(i){
            this.WorkoutSchedule[i].exercise.time -= this.completed;
            if(this.WorkoutSchedule[i].exercise.time <= 0){
                this.WorkoutSchedule.splice(i,1);
                alert("Congratulations! You finished your exercise.");
            }
            this.completed = 0;
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