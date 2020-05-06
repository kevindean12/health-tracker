<template>
    <div class="container">
        <h1 class="title is-4">Manage Available Exercises</h1>
        {{error}}
        <div v-if="added != null">
            <p class="title is-6">
                Added new exercise:
                <br> 
                {{added.name}}
                <br>
                {{added.category}}
                <br>
                {{added.description}}
            </p>
        </div>
        <form class="box" @submit.prevent="add">
            <div class="field">
                <div class="control">
                    <label class="label">Name</label>
                    <input type="text" placeholder="Free Weight Bicep Curls" v-model="name">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label class="label">Description</label>
                    <input type="text" v-model="description" placeholder="Beginning with arm extended, use bicep to curl the weight up toward the shoulder.">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label class="radio">
                        <input type="radio" name="category" v-model="category" value="Cardio">
                        Cardio
                    </label>
                    <label class="radio">
                        <input type="radio" name="category" v-model="category" value="Strength" checked>
                        Strength
                    </label>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label class="label">Suggested Time</label>
                    <input type="number" placeholder="0" v-model="time">
                </div>
            </div>
            <button class="button is-success">
                Add
            </button>
        </form>
        <div v-if="updated != null">
            <p class="title is-6">
                Updated the following exercise:
                <br> 
                {{updated.name}}
                <br>
                Its new values are:
                <br>
                {{updated.category}}
                <br>
                {{updated.description}}
                <br>
                Suggested time: {{updated.time}} minutes.
            </p>
        </div>
          <div class="card" v-for="(exercise, i) in Planner.Exercises" :key="exercise.name">
              <div class="card-header-title">
                  {{exercise.name}}
              </div>
              <div class="card-content">
                  <p class="content"><strong>Description: </strong>{{exercise.description}}</p>
                  <p class="content"><strong>Category: </strong> {{exercise.category}} </p>
                  <p class="content"><strong>Suggested time: </strong> {{exercise.time}} minutes</p>
              </div>
              <footer class="card-footer">
                <form class="card-footer-item">
                    <div :id="'card-number-'+i" class="dropdown">
                        <button @click.prevent="makeActive(i)" class="button is-warning dropdown-trigger">Edit</button>
                        <div class="dropdown-menu">
                            <div class="dropdown-content">
                                <div class="dropdown-item">
                                    <div class="field">
                                        <div class="control">
                                            <label class="label">
                                                Description
                                            </label>
                                            <input type="text" placeholder="Name" v-model="editExercise.description">
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <label class="radio">
                                                <input type="radio" name="category" v-model="editExercise.category" value="Cardio">
                                                Cardio
                                            </label>
                                            <label class="radio">
                                                <input type="radio" name="category" v-model="editExercise.category" value="Strength" checked>
                                                Strength
                                            </label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <label class="label">
                                                Time
                                            </label>
                                            <input type="number" placeholder="Name" v-model="editExercise.time">
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control"><button class="button is-success" @click.prevent="edit(exercise.name)">Submit</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="card-footer-item">
                    <button @click.prevent="deleteExercise(exercise.name)" class="button is-danger">Delete</button>
                </div>
              </footer>
          </div>
    </div>
</template>

<script>

import Planner from "../models/Planner";

export default {
    created(){
        Planner.start();
    },
    data: () => ({
        name: '',
        description: '',
        category: '',
        time: 0,
        Planner,
        editExercise: {name: '', description: '', category: '', time: 0},
        added: null,
        updated: null,
        error: ''
    }),
    methods: {
        async add() {
            try{
                if(!this.name || !this.description || !this.category || !this.time){
                    throw Error("Each field needs to be filled");
                }
                const response = await Planner.createExercise(this.name, this.description, this.category, this.time);
                this.added = response.added;
            } catch(error) {
                this.error = error.message;
            }
            
        },
        async deleteExercise(name){
            try{
                await Planner.deleteExercise(name);
            } catch(error){
                this.error = error.message;
            }
            
        },
        makeActive(id) {
            const exerciseCard = document.getElementById('card-number-'+id);
            if(exerciseCard.classList.contains("is-active")){
                exerciseCard.classList.remove("is-active");
            }
            else {
                exerciseCard.classList.add("is-active");
            }
        },
        async edit(name) {
            try{
                const response = await Planner.editExercise(name, 
                {
                    description: this.editExercise.description, 
                    category: this.editExercise.category,
                    time: this.editExercise.time
                });
                this.updated = response.updated;
            } catch(error){
                this.error = error.message;
            }
        }
    }
}
</script>

<style>

</style>