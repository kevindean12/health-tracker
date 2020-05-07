<template>
    <div class="container">
        <div v-if="congrats" class="notification is-success has-text-centered" id="congrats"> {{congrats}} <button @click="clearNote('c')" class="delete" ></button></div>
        <div class="box">
            <div class="title is-3 has-text-centered">Listen</div>
            <div class="columns">
                <div class="column is-one-quarter"></div>
                <div class="column is-half">
                    <audio controls :src="currentAudio" class="has-text-centered">
                        Sorry, there's supposed to be an audio player here but your browser doesn't support HTML5!
                    </audio>
                    <div class="panel is-link">
                        <a v-for="(pod, i) in availablePodcasts" :key="i" href="#" @click="updateTrack(i)" class="panel-block">
                            <img :src="pod.coverArt" :alt="pod.title" class="image is-64x64">
                            {{pod.episodeTitle}}
                        </a>
                    </div>
                    <div v-if="error" class="notification is-danger" id="error">{{error}} <button @click="clearNote('e')" class="delete"></button></div>
                </div>
                <div class="column is-one-quarter"></div>
            </div>
        </div>
        <div class="title is-3 has-text-centered">My Workouts</div>
        <div v-if="goalShared" class="notification is-success" id="goal-share">Goal shared! <button @click="clearNote('g')" class="delete" ></button> </div>
        <div v-if="workoutShared" class="notification is-success" id="workout-share">Workout shared! <button @click="clearNote('w')" class="delete"></button> </div>
        <div class="columns">
            <div class="column is-one-quarter">
                <div v-for="(goal, i) in Planner.CurrentGoals" :key="goal._id" class="goal">
                    <div class="title is-4 has-text-centered">Goal #{{i+1}}</div>
                    <button v-if="currentGoal != goal._id" @click.prevent="setCurrentGoal(goal._id)" class="button">Work on this goal</button>
                    <div v-else class="notification is-primary">Working on this goal</div>
                    <div>
                        <span class="icon fa-lg">
                            <i class="fas fa-dumbbell"></i> 
                        </span>
                        <div class="title is-5 is-inline">
                            {{goal.Strength.Amount}} mins strength
                        </div>
                    </div>
                    <div>
                        <span class="icon fa-lg">
                            <i class="fas fa-running"></i> 
                        </span>
                        <div class="title is-5 is-inline">
                            {{goal.Cardio.Amount}} mins cardio
                        </div>
                    </div>
                    <button @click="shareGoal(goal._id)" class="button is-large is-link">
                        Share Goal!
                    </button>
                </div>
            </div>
            <div class="column is-three-quarters">
                <div class="card" v-for="(workout, i) in Planner.WorkoutSchedule" :key="i">
                    <div class="title is-3 has-text-centered">Workout #{{i+1}}</div>
                    <div v-for="(exercise, j) in workout.Exercises" :key="exercise._id">
                        <header class="card-header">
                            <span class="card-header-title">
                            Exercise {{j+1}} 
                            </span>
                        </header>
                        <div class="card-content">
                            <span class="title is-4 is-pulled-right"> {{exercise.time}} minutes remaining </span>
                            <div class="columns">
                                <div class="column">
                                    <span class="title is-4"> {{exercise.name}} </span>
                                    <span class="icon fa-lg">
                                        <i v-if="exercise.category =='Strength'" class="fas fa-dumbbell"></i>
                                        <i v-else class="fas fa-running"></i>
                                    </span>
                                    <p class="content">
                                        {{exercise.description}}
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                        <footer class="card-footer">
                            <div class="dropdown" :id="exercise._id">
                                <div class="dropdown-trigger">
                                    <button class="button" @click="makeActive(exercise._id)" aria-haspopup="true" aria-controls="dropdown-menu2">
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
                                        <button @click.prevent="updateExercise(workout._id, j, currentGoal)" class="button">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                    <div id="workout-btn">
                        <button @click="shareWorkout(workout._id)" class="button is-large is-link">
                            Share Workout!
                        </button>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
//import {WorkoutSchedule} from "../models/Log.js";
//import {CurrentGoal} from "../models/Planner.js";
import Planner from "../models/Planner.js"
export default {
    name: 'ExerciseLog',
    data: () => ({
        Planner,
        completed: 0,
        trackTimePlay: 0,
        trackTimeStop: 0,
        currentAudio: "",
        currentGoal: "",
        congrats: "",
        error: "",
        goalShared: false,
        workoutShared: false
    }),
    computed: {
        availablePodcasts: function(){
            const uniquePods = [];
            for(let i = 0; i < Planner.WorkoutSchedule.length; i++){
                for(let j = 0; j < Planner.WorkoutSchedule[i].Podcasts.length; j++){
                    const pod = Planner.WorkoutSchedule[i].Podcasts[j];
                    if(!uniquePods.map(x => x.episodeTitle).includes(pod.episodeTitle)){
                        uniquePods.push(pod);
                    }
                }
            }
            return uniquePods;
        }
    },
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
        clearNote(which){
            switch(which){
                case 'g': document.getElementById("goal-share").toggleAttribute("hidden");
                    break;
                case 'w': document.getElementById("workout-share").toggleAttribute("hidden");
                    break;
                case 'e': document.getElementById("error").toggleAttribute("hidden");
                    break;
                case 'c': document.getElementById("congrats").toggleAttribute("hidden");
                default: break;
            }
        },
        async shareGoal(GID){
            try{
                this.goalShared = true;
                const response = await Planner.share({type: "Goal", ID: GID});
                if(response.message != "ok"){
                    throw Error("Could not share that goal.");
                }
            } catch(error) {
                this.error = error.message;
            }
            
        },
        async shareWorkout(workoutID){
            try{
                this.workoutShared = true;
                const response = await Planner.share({type: "Workout", ID: workoutID});
                if(response.message != "ok"){
                    throw Error("Could not share that workout.");
                }
            } catch(error) {
                this.error = error.message;
            }
            
        },
        async updateExercise(workoutID, jExercise, whichGoal){
            try{
                if(!this.currentGoal){
                    throw Error("Please select a goal to work on first!");
                }
                const response = await Planner.updateExerciseProgress(whichGoal, workoutID, jExercise, this.completed);
                console.log("Progress object",response.progress);
                this.completed = 0;
                let congrats = "";
                if(response.progress.Exercise){
                    congrats += "You completed an exercise!";
                }
                if(response.progress.Workout){
                    congrats += " You completed a workout!";
                }
                if(response.progress.Goal){
                    congrats += " You completed your goal!";
                }
                this.congrats = congrats;
            } catch(error) {
                this.error = error.message;
            }
            
        },
        updateTrack(index){
            this.currentAudio = this.availablePodcasts[index].audio;
        },
        setCurrentGoal(GID){
            this.currentGoal = GID;
        }
    }
}
</script>

<style>
audio{
    width: 100%;
}
.goal{
    margin-top: 5rem;
    margin-bottom: 2rem;
}
#workout-btn{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>