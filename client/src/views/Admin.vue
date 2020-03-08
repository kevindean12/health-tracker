<template>
    <div class="container">
        <h1 class="title is-4">Manage Available Exercises</h1>
        <form>
            <div class="field">
                <div class="control">
                    <label class="label">Name</label>
                    <input type="text" placeholder="Free Weight Curls">
                </div>
            </div>
        </form>
          <div class="card">
              <div class="card-header-title">
                  
              </div>
              <div class="card-content">
                  
              </div>
          </div>
    </div>
</template>

<script>
import { Exercises, Exercise } from "../models/Planner";
export default {
    data: () => ({
        Exercises
    }),
}
</script>

<style>

</style>