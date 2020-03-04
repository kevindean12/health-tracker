<template>
    <div class="container">
        <div class="title is-2">My Workouts This Week</div>
        <div class="card" v-for="workout in CurrentWorkouts" :key="workout.day">
            <header class="card-header">
                <p class="card-header-title">
                Day {{workout.day}}. {{workout.exerciseType}}
                </p>
                <p class="card-header-title is-pulled-right">Length: {{workout.time}} minutes</p>
                <span class="icon is-large">
                    <i v-if="workout.exerciseType=='Strength'" class="fas fa-dumbbell"></i>
                    <i v-else class="fas fa-running"></i>
                </span>
            </header>
            <div class="card-content">
                <div class="content">
                Playlist:
                    <ol>
                        <li v-for="track in workout.workoutPlaylist" :key="track">
                            {{track.podTitle}}: {{track.episode}}
                        </li>
                    </ol>
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
import {CurrentWorkouts} from "../models/Log.js";
export default {
    name: 'ExerciseLog',
    data: () => ({
        CurrentWorkouts
    }),
    components: {

    }
}
</script>

<style>

</style>