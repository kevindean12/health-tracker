<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="card">
      <div class="card-header">
        <div class="card-header-title has-text-centered">Set weekly goal</div>
      </div>
      <div class="card-content">
        <form action="">
          <div class="field">
            <div class="control">
              <label class="label">Select minutes per day of cardio</label> 
              <input type="number" placeholder="0">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">
                Select minutes per day of strength
              </label>
              <input type="number" placeholder="0">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">How many days will you exercise this week?</label> 
              <input type="number" placeholder="0">
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
            <form @submit.prevent="search(searchWords)">
              {{error}}
              <div class="field">
                <div class="control">
                  <label class="label">Search podcasts by keyword</label>
                  <input type="text" placeholder="17th century board games" v-model="searchWords">
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
          </div>
          <div class="card-image">
            <img class="image is-3by1" id="listen-notes" src="../assets/listen_notes.png" alt="powered by Listen Notes">
          </div>
        </div>
      </div>
      
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchPodcasts } from "../models/Planner";
export default {
  data: () => ({
    minsCardio: 0,
    minsStrength: 0,
    searchWords: '',
    exercises: [],
    userPlaylist: [],
    workouts: [],
    searchResults: [],
    error: '',
  }),
  methods: {
    createGoal(minsCardio, minsStrength, days, exercises){

    },
    search(keywords){
      try {
        searchPodcasts(keywords)
      } catch (error) {
        this.error = error;
      }
    },
    
  }
}
</script>

<style>
#listen-notes {
  max-width: 15rem;
}
</style>