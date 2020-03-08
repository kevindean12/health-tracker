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
          <div class="card" v-for="(exercise, i) in Exercises" :key="exercise.name">
              <div class="card-header-title">
                  {{exercise.name}}
              </div>
              <div class="card-content">
                  <p class="content"><strong>Description: </strong>{{exercise.description}}</p>
                  <p class="content"><strong>Category: </strong> {{exercise.category}} </p>
                  <p class="content"><strong>Suggested time: </strong> {{exercise.time}} minutes</p>
              </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item">Edit</a>
                <a href="#" @click.prevent="deleteExercise(i)" class="card-footer-item">Delete</a>
              </footer>
          </div>
    </div>
</template>

<script>
import { Exercises, Exercise } from "../models/Planner";
export default {
    data: () => ({
        Exercises,
        name: '',
        description: '',
        category: '',
        time: 0
    }),
    methods: {
        add() {
            Exercises.push(new Exercise(this.name, this.description, this.category, this.time));
        },
        deleteExercise(index){
            Exercises.splice(index, 1);
        }
    }
}
</script>

<style>

</style>