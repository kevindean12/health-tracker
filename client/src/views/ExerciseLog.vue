<template>
    <div class="container">
        <div class="title is-2">My Workouts This Week</div>
        <div class="card" v-for="(workout, i) in WorkoutSchedule" :key="workout.exercise.toString()">
            <header class="card-header">
                <span class="card-header-title">
                Exercise {{i+1}} 
                </span>
            </header>
            <div class="card-content">
                <span class="title is-4"> {{workout.exercise.name}} </span>
                <span class="icon fa-lg">
                    <i v-if="workout.exercise.category =='Strength'" class="fas fa-dumbbell"></i>
                    <i v-else class="fas fa-running"></i>
                </span>
                <span class="title is-4 is-pulled-right"> {{workout.exercise.time}} minutes </span>
                <p class="content">
                    {{workout.exercise.description}}
                </p>
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
    }
}
</script>

<style>

</style>