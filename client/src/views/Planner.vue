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
      <div class="search-results">
        <div class="columns" v-for="pod in searchResults" :key="pod.podcast_title_original" >
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
            <button class="button">Add</button>
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
    async search(keywords, page){
      try {
        const results = await searchPodcasts(keywords, page);
        this.searchResults = results.body.results;
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
.has-overflow {
  overflow: scroll;
  max-height: 12rem;
}

</style>