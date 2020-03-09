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
            <p>Your workout playlist will populate automatically from your user playlist, but you can also make changes to it:</p>
            <form>
              <div class="field">
                <div class="control">
                  <div class="select">
                    <select>
                      <option v-for="(exercise, i) in Exercises" :key="exercise.name" :value="exercise.name"> {{exercise.name}} </option>
                    </select>
                  </div>
                </div>
                <div class="control"><button @click.prevent="addExerciseToWorkout(i)" class="button">Add to workout</button></div>
              </div>
              <div class="field">
                <div class="control">
                  <input type="number" placeholder="0"> minutes
                </div>
                <!-- <div class="control"><button @click.prevent="updateTime(i)" class="button">Add to workout</button></div> -->
              </div>
              <hr>
              <p class="has-text-centered"><strong>Your playlist</strong></p>
              <div class="columns" v-for="(pod, i) in UserPlaylist" :key="pod.title">
                <div class="column is-3">
                  <img :src="pod.coverArt" :alt="pod.title" class="image is-64x64">
                </div>
                <div class="column is-5">
                  <div> {{pod.episodeTitle}} </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <div class="control">
                      <div class="select">
                        <select>
                          <option v-for="(exercise, j) in workoutExercises" :key="exercise.name" :value="exercise.name"> {{exercise.name}} </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <div class="control"><button @click.prevent="addToWorkoutPlaylist(i)" class="button">Add</button></div>
                  </div>
                </div>
                <div class="column is-1">
                  <div class="field">
                    <div class="control"><button @click.prevent="removeFromPlaylist(i)" class="button">X</button></div>
                  </div>
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
            <div class="card-header-title has-text-centered">
              Your Workouts
            </div>
          </div>
          <div class="card-content">
            <div class="columns" v-for="workout in workouts" :key="workout.exercises">
              <div class="column">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchPodcasts, Exercises, UserPlaylist, Podcast, Workout } from "../models/Planner";
import { WorkoutSchedule } from "../models/Log";
export default {
  data: () => ({
    minsCardio: 0,
    minsStrength: 0,
    daysToExercise: 0,
    searchWords: '',
    exerciseTime: 0,
    workoutExercises: [],
    workoutPlaylist: [],
    workouts: [],
    searchResults: [],
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
      this.workoutPlaylist.push(this.UserPlaylist[index]);
    },
    removeFromPlaylist(index){
      this.UserPlaylist.splice(index, 1);
    },
    addExerciseToWorkout(index){
      const exercise = this.Exercises[index];
      exercise.time = this.exerciseTime;
      this.workoutExercises.push(exercise);
    },
    createWorkout(exercise, episode){
      this.workouts.push()
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