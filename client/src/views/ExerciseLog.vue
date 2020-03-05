<template>
    <div class="container">
        <div class="title is-2">My Workouts This Week</div>
        <!-- <div class="dropdown" :class="{'is-active': isOpen}" v-for="(workout, i) in WorkoutSchedule" :key="workout.exercises">
            <div class="dropdown-trigger">
                <button class="button" @click="isOpen = !isOpen" aria-haspopup="true" aria-controls="dropdown-menu2">
                <span> Day {{i+1}} </span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu2" role="menu">
                <div class="dropdown-content">
                    <div class="dropdown-item" v-for="exercise in workout.exercises" :key="exercise.name">
                        <span>
                            {{exercise.name}} | Length: {{exercise.time}} minutes
                            <span class="icon is-large">
                                <i v-if="exercise.category=='Strength'" class="fas fa-dumbbell"></i>
                                <i v-else class="fas fa-running"></i>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="card" v-for="(workout, i) in WorkoutSchedule" :key="workout.exercises">
            <header class="card-header">
                <span class="card-header-title">
                Day {{i+1}} 
                </span>
                <span class="title is-6 is-pulled-right">Length: {{workout.time}} minutes</span>
            </header>
            <div class="card-content" v-for="exercise in workout.exercises" :key="exercise.name">
                <span class="title is-4"> {{exercise.name}} </span>
                <span class="icon fa-lg">
                    <i v-if="exercise.category =='Strength'" class="fas fa-dumbbell"></i>
                    <i v-else class="fas fa-running"></i>
                </span>
                <span class="title is-4 is-pulled-right"> {{exercise.time}} minutes </span>
                <p class="content">
                    {{exercise.description}}
                </p>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">Update Progress</a>
                <a href="#" class="card-footer-item">Delete</a>
            </footer>
        </div>
  </div>
</template>

<script>
import {CurrentGoal, WorkoutSchedule} from "../models/Log.js";
export default {
    name: 'ExerciseLog',
    data: () => ({
        CurrentGoal,
        WorkoutSchedule,
        isOpen: true,
    }),
}
</script>

<style>

</style>