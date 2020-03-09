<template>
    <div class="container">
        <div class="title is-3">Welcome, {{CurrentUser.Name}} </div>
        <div class="columns">
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <div class="card-header-title">
                            <router-link class="navbar-item" to="/planner">Plan your workout</router-link>
                        </div>
                    </div>
                    <div class="card-content">
                        <ul>
                            <li>Set a weekly exercise goal.</li>
                            <li>Make a playlist.</li>
                            <li>Get moving.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <div class="card-header-title">
                            <router-link class="navbar-item" to="/exerciselog">Log your exercise</router-link>
                        </div>
                    </div>
                    <div class="card-content">
                        <ul>
                            <li>Update time spent on your planned exercises.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <div class="card-header-title">
                             Edit your profile
                        </div>
                    </div>
                    <div class="card-content">
                        <ul>
                            <li>Change password.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { CurrentUser } from "../models/Users";

export default {
    data: () => ({
        CurrentUser,
    })
}
</script>

<style>

</style>