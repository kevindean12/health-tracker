<template>
    <div class="container">
    <div class="card" v-for="workout in CurrentWorkouts" :key="workout.day">
        <header class="card-header">
            <p class="card-header-title">
            {{workout.day}} -- {{workout.exerciseType}}
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </a>
        </header>
        <div class="card-content">
            <div class="content">
            Playlist:
                <!-- <ol>
                    <li v-for="track in workout.workoutPlaylist" :key="track">
                        {{track.podTitle}}: {{track.episode}}
                    </li>
                </ol> -->
            </div>
        </div>
        <footer class="card-footer">
            <a href="#" class="card-footer-item">Update Progress</a>
            <a href="#" class="card-footer-item">Delete</a>
        </footer>
    </div>
  </div>
</template>

<script>
import {Exercises, Playlist, CurrentWorkouts, WeeklyGoal, calculateWorkout} from "../models/Log.js";
export default {
    name: 'Home',
    data: () => ({
        CurrentWorkouts
    }),
    components: {

    }
}
</script>

<style>

</style>