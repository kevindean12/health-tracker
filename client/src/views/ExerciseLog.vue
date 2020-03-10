<template>
    <div class="container">
        <div class="title is-2">My Workouts This Week</div>
        <div class="card" v-for="(workout, i) in WorkoutSchedule" :key="i">
            <header class="card-header">
                <span class="card-header-title">
                Exercise {{i+1}} 
                </span>
            </header>
            <div class="card-content">
                 <span class="title is-4 is-pulled-right"> {{workout.exercise.time}} minutes </span>
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
                        
                        <div v-for="(pod, i) in workout.podcasts" :key="i" class="is-inline-block">
                            <img :src="pod.coverArt" :alt="pod.title" class="image is-64x64">
                            <p>{{pod.episodeTitle}}</p>
                        </div>
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
                            <button @click.prevent="updateExercise(i)" class="button">
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
import {WorkoutSchedule} from "../models/Log.js";
import {CurrentGoal} from "../models/Planner.js";
export default {
    name: 'ExerciseLog',
    data: () => ({
        CurrentGoal,
        WorkoutSchedule,
        completed: 0,
    }),
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
        }
    }
}
</script>

<style>

</style>