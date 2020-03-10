<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="card">
      <div class="card-header">
        <div class="card-header-title has-text-centered">Set weekly goal</div>
      </div>
      <div class="card-content">
        <form>
          <div class="field">
            <div class="control">
              <label class="label">Select minutes per day of cardio</label> 
              <input type="number" placeholder="0" v-model="minsCardio">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">
                Select minutes per day of strength
              </label>
              <input type="number" placeholder="0" v-model="minsStrength">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">How many days will you exercise this week?</label> 
              <input type="number" placeholder="0" v-model="daysToExercise">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-success">
                Update Goal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
      </div>
    </div>
    
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title has-text-centered">Create a playlist</div>
          </div>
          <div class="card-content">
            <form @submit.prevent="search(searchWords,0)">
              {{error}}
              <div class="field">
                <div class="control">
                  <label class="label">Search podcasts by keyword</label>
                  <input type="search" placeholder="17th century board games" v-model="searchWords">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button is-success">
                    Search
                  </button>
                </div>
              </div>
            </form>
            <img class="image" id="listen-notes" src="../assets/listen_notes.png" alt="powered by Listen Notes">
          </div>
        </div>
      </div>
    </div>
    <div class="search-results">
        <div class="columns" v-for="(pod, i) in searchResults" :key="pod.podcast_title_original" >
          <div class="column is-2">
            <p> <strong>{{pod.podcast_title_original}}</strong> </p>
          </div>
          <div class="column is-1">
            <div class="content">
              <p>{{Math.floor(pod.audio_length_sec/60)}}:{{pod.audio_length_sec%60}}</p>
            </div>
          </div>
          <div class="column is-4">
            {{pod.title_original}}
          </div>
          <div class="column is-4 has-overflow">
            {{pod.description_original}}
          </div>
          <div class="column is-1">
            <button @click.prevent="addToPlaylist(i)" class="button">Add</button>
          </div>
        </div>
      </div>
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title has-text-centered">
              Plan a workout
            </div>
          </div>
          <div class="card-content">
            <p>Add exercises</p>
            <p>Select an exercise and how long you plan to do it, and then a podcast episode from your playlist to pair with it.</p>
            <form @submit.prevent="createWorkout">
              <div class="columns">
                <div class="column">
                  <div v-for="exercise in Exercises" :key="exercise.name">
                    <p> {{exercise.name}} </p>
                    <div class="field">
                      <div class="control">
                        <input type="number" placeholder="0" v-model="exerciseTime"> minutes
                      </div>
                      <div class="control"><button @click.prevent="addExercise(exercise)" class="button">Submit Exercise</button></div>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <p>Selected exercise: {{exerciseSelection.name}} for {{exerciseTime}} minutes </p>
                </div>
              </div>
              
              <hr>
              <p class="has-text-centered"><strong>Your playlist</strong></p>
              <div class="columns" v-for="(pod, i) in UserPlaylist" :key="pod.title">
                <div class="column is-2">
                  <img :src="pod.coverArt" :alt="pod.title" class="image is-64x64">
                </div>
                <div class="column is-5">
                  <div> {{pod.episodeTitle}} </div>
                </div>
                <div class="column is-1">
                  <div> {{Math.floor(pod.duration/60)}}:{{pod.duration%60}} </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <div class="control"><button @click="addToWorkoutPlaylist(i)" class="button">Add to workout</button></div>
                  </div>
                </div>
                <!-- <div class="column is-1">
                  <div class="field">
                    <div class="control"><button @click.prevent="removeFromPlaylist(i)" class="button">X</button></div>
                  </div>
                </div> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title has-text-centered">
              Your Workout Schedule
            </div>
          </div>
          <div class="card-content">
            <div class="columns">
              <div class="column">
                <strong>Exercise</strong>
              </div>
              <div class="column">
                <strong>Minutes</strong>
              </div>
              <div class="column">
                <strong>Podcast</strong>
              </div>
              <div class="column">
                <strong>How much of podcast?</strong>
              </div>
            </div>
            <div class="columns" v-for="workout in WorkoutSchedule" :key="workout.exercise">
              <div class="column">
                <p> {{workout.exercise.name}} </p>
              </div>
              <div class="column">
                <p> {{workout.exercise.time}} </p>
              </div>
              <div class="column">
                <p> {{workout.podcast.episodeTitle}} </p>
              </div>
              <div class="column">
                <progress class="progress" :value="((workout.podcast.duration-workout.podcast.remaining)/workout.podcast.duration)*100" max="100">15%</progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchPodcasts, Exercises, UserPlaylist, Podcast} from "../models/Planner";
import { WorkoutSchedule } from "../models/Log";
export default {
  data: () => ({
    minsCardio: 0,
    minsStrength: 0,
    daysToExercise: 0,
    searchWords: '',
    exerciseTime: 0,
    searchResults: [],
    exerciseSelection: {name: '', description: '', category: '', time: 0},
    workoutExerciseTime: 0,
    workoutPodcast: {title: '', episodeTitle: '', duration: ''},
    error: '',
    Exercises,
    UserPlaylist,
    WorkoutSchedule
  }),
  methods: {
    createGoal(minsCardio, minsStrength, days, exercises){

    },
    async search(keywords, page){
      try {
        const results = await searchPodcasts(keywords, page);
        this.searchResults = results.body.results;
      } catch (error) {
        this.error = error;
      }
    },
    addToPlaylist(resultIndex){
      const in_pod = this.searchResults[resultIndex];
      const out_pod = new Podcast(in_pod.podcast_title_original, in_pod.title_original, in_pod.audio_length_sec);
      out_pod.coverArt = in_pod.image;
      this.UserPlaylist.push(out_pod);
    },
    addToWorkoutPlaylist(index){
      this.workoutPodcast = this.UserPlaylist[index];
    },
    removeFromPlaylist(index){
      this.UserPlaylist.splice(index, 1);
    },
    createWorkout(){
      this.workoutPodcast.remaining -= this.exerciseSelection.time*60;
      this.WorkoutSchedule.push({
        exercise: this.exerciseSelection,
        podcast: this.workoutPodcast
      });
    },
    addExercise(exercise){
      this.exerciseSelection = JSON.parse(JSON.stringify(exercise));
      this.exerciseSelection.time = this.exerciseTime;
    }
    
  }
}
</script>

<style>
#listen-notes {
  max-width: 15rem;
  float: left;
}
.has-overflow {
  overflow: scroll;
  max-height: 12rem;
}
img {
  float: left;
  margin-right: 5em;
}
</style>