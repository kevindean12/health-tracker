<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="card">
      <div class="card-header">
        <div class="card-header-title has-text-centered">Set weekly goal</div>
      </div>
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <form>
              <div class="field">
                <div class="control">
                  {{error}}
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
                  <input type="number" placeholder="1" max="7" v-model="daysToExercise">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button @click.prevent="createGoal" class="button is-success">
                    Create Goal
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="column">
            <p><strong>Current Goal for this week:</strong></p>
            <p> {{CurrentGoal.cardioMinutes}} minutes of Cardio </p>
            <p> {{CurrentGoal.strengthMinutes}} minutes of Strength </p>
            <p> over {{CurrentGoal.days}} days </p>
          </div>
        </div>
        
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
        <div class="columns" v-for="(pod, i) in searchResults" :key="i" >
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
            <p>Select an exercise and how long you plan to do it, then add podcast episodes. Finally, click "create workout" to pair exercises and podcasts.</p>
            <form @submit.prevent="createWorkout">
              <div class="columns">
                <div class="column">
                  <div v-for="(exercise, i) in Planner.Exercises" :key="i">
                    <p draggable="true"> {{exercise.name}} </p>
                    <div class="field">
                      <div class="control">
                        <input type="number" placeholder="0" v-model="exerciseTime[i]"> minutes
                      </div>
                      <div class="control"><button @click.prevent="addExercise(exercise, i)" class="button">Submit Exercise</button></div>
                    </div>
                  </div>
                </div>
                <!-- <div class="column">
                  <p>Added exercise: {{exerciseSelection[exerciseSelection.length-1].name}} for {{exerciseTime}} minutes </p>
                </div> -->
              </div>
              
              <hr>
              <p class="has-text-centered"><strong>Your playlist</strong></p>
              <div draggable="true" class="columns" v-for="(pod, i) in Planner.UserPlaylist" :key="i">
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
                    <div class="control"><button @click.prevent="addToWorkoutPlaylist(i)" class="button">Add to workout</button></div>
                  </div>
                </div>
                <!-- <div class="column is-1">
                  <div class="field">
                    <div class="control"><button @click.prevent="removeFromPlaylist(i)" class="button">X</button></div>
                  </div>
                </div> -->
              </div>
              <div class="field">
                <div class="control"><button role="submit" class="button">Create Workout</button></div>
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
                <strong>Podcast</strong>
              </div>
              <div class="column">
                <strong>Amount of podcast when you're done</strong>
              </div>
            </div>
            <div class="workouts" v-for="(workout, i) in Planner.WorkoutSchedule" :key="i">
              <div class="columns" v-for="pod in workout.podcasts" :key="pod.title">
                <div class="column">
                  <p> {{workout.exercise.name}} </p>
                </div>
                <div class="column">
                  <p> {{pod.episodeTitle}} </p>
                </div>
                <div class="column">
                 {{Math.floor(pod.duration/60)-Math.floor(pod.remaining/60)}}mins <progress class="progress" :value="((pod.duration-pod.remaining)/pod.duration)*100" max="100"></progress>
                </div>
              </div>
              <hr>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { searchPodcasts, Exercises, UserPlaylist, Podcast, createGoal } from "../models/Planner";
import Planner from "../models/Planner";
//import { WorkoutSchedule } from "../models/Log";
export default {
  created(){
    Planner.start();
  },
  data: () => ({
    minsCardio: 0,
    minsStrength: 0,
    daysToExercise: 0,
    searchWords: '',
    exerciseTime: [],
    searchResults: [],
    exerciseSelection: [],
    workoutExerciseTime: 0,
    workoutPodcasts: [],
    error: '',
    Planner,
    CurrentGoal: {}
  }),
  methods: {
    async createGoal(){
      const numDays = this.daysToExercise;
      if(numDays > 7){
        const errormessage = "There are only 7 days in a week, you overachiever! Increase the time per day instead.";
        this.error = errormessage;
        throw Error(errormessage);
      }
      else if(numDays < 1){
        const toofew = "You need at least one day for all those minutes per day you chose to mean anything...";
        this.error = toofew;
        throw Error(toofew);
      }
      this.CurrentGoal = await Planner.createGoal(this.minsCardio, this.minsStrength, numDays);
      console.log(this.CurrentGoal);
    },
    async search(keywords, page){
      try {
        const results = await Planner.searchPodcasts(keywords, page);
        this.searchResults = results.body.results;
      } catch (error) {
        this.error = error;
      }
    },
    addToPlaylist(resultIndex){
      const inPod = this.searchResults[resultIndex];
      const outPod = {title: inPod.podcast_title_original, episodeTitle: inPod.title_original, duration: inPod.audio_length_sec, audio: inPod.audio, coverArt: inPod.image};
      // this.UserPlaylist.push(out_pod);
      Planner.addToPlaylist(outPod);
    },
    addToWorkoutPlaylist(index){
      this.workoutPodcasts.push(JSON.parse(JSON.stringify(Planner.UserPlaylist[index])));
      alert(`Added episode to workout playlist.`);
    },
    removeFromPlaylist(index){
      Planner.UserPlaylist.splice(index, 1);
    },
    async createWorkout(){
      let exercisesToRemove = 0;
      for(let j = 0; j < this.exerciseSelection.length; j++){
        let exTime = this.exerciseSelection[j].time*60;
        let count = 0;
        this.WorkoutSchedule.push({
          exercise: JSON.parse(JSON.stringify(this.exerciseSelection[j])),
          podcasts: [JSON.parse(JSON.stringify(this.workoutPodcasts[0]))]
        });
        let len = this.WorkoutSchedule.length-1;
        let workoutPodsIndex = 1;
        for(let i = 0; i < this.WorkoutSchedule[len].podcasts.length; i++){
          if(this.WorkoutSchedule[len].podcasts[i].remaining >= exTime){
            this.WorkoutSchedule[len].podcasts[i].remaining -= exTime;
            this.workoutPodcasts[workoutPodsIndex-1].remaining -= exTime;
            exercisesToRemove++;
            break;
          }
          else { //exercise time is greater than remaining podcast time
            exTime -= this.WorkoutSchedule[len].podcasts[i].remaining;
            this.WorkoutSchedule[len].podcasts[i].remaining = 0;
            if(workoutPodsIndex >= this.workoutPodcasts.length){
              count++;
              break;
            }
            this.WorkoutSchedule[len].podcasts.push(JSON.parse(JSON.stringify(this.workoutPodcasts[workoutPodsIndex++])));
            count++;
          }
        }
        if(exTime <= 0){
            exercisesToRemove++;
          }
        else{
          this.exerciseSelection[j].time = Math.floor(exTime/60);
        }
        this.workoutPodcasts.splice(0, count);
        this.exerciseSelection.splice(0, exercisesToRemove);
      }
      console.log("workout podcasts:", this.workoutPodcasts);
      console.log("workouts", this.WorkoutSchedule);
      console.log("exercises: ", this.exerciseSelection);
    },
    addExercise(exercise, i){
      const ex = JSON.parse(JSON.stringify(exercise));
      ex.time = this.exerciseTime[i];
      this.exerciseSelection.push(ex);
      alert(`Added ${ex.name} for ${ex.time} minutes to exercise list.`);
    },
    
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