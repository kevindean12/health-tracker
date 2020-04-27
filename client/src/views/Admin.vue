<template>
    <div class="container">
        <h1 class="title is-4">Manage Available Exercises</h1>
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
                <form class="card-footer-item" @submit.prevent="edit(i)">
                    <div :id="'card-number-'+i" class="dropdown">
                        <a @click.prevent="makeActive(i)" class="dropdown-trigger">Edit</a>
                        <div class="dropdown-menu">
                            <div class="dropdown-content">
                                <div class="dropdown-item">
                                    <div class="field">
                                        <div class="control">
                                            <label class="label">
                                                Name
                                            </label>
                                            <input type="text" placeholder="Name" v-model="editExercise.name">
                                        </div>
                                    </div>
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
                                        <div class="control"><button class="button is-success">Submit</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <a href="#" @click.prevent="deleteExercise(i)" class="card-footer-item">Delete</a>
              </footer>
          </div>
    </div>
</template>

<script>

import Planner from "../models/Planner";

export default {
    data: () => ({
        Exercises: Planner.Exercises,
        name: '',
        description: '',
        category: '',
        time: 0,
        editExercise: {name: '', description: '', category: '', time: 0},
    }),
    methods: {
        add() {
            Exercises.push({name: this.name, description: this.description, category: this.category, time: this.time});
        },
        deleteExercise(index){
            Exercises.splice(index, 1);
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
        edit(id) {
            if(this.editExercise.name != ''){
                Exercises[id].name = this.editExercise.name;
            }
            if(this.editExercise.description != ''){
                Exercises[id].description = this.editExercise.description;
            }
            if(this.editExercise.category != ''){
                Exercises[id].category = this.editExercise.category;
            }
            if(this.editExercise.time != 0){
                Exercises[id].time = this.editExercise.time;
            }
        }
    }
}
</script>

<style>

</style>