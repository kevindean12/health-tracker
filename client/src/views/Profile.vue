<template>
    <div class="container">
        <div class="title is-3">Welcome, {{CurrentUser.Name}} </div>
        <div class="tile is-ancestor">
            <div class="tile">
                <div class="card">
                    <div class="card-header">
                        <div class="card-header-title">
                            Plan your workout
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
            <div class="tile">
                <div class="card">
                    <div class="card-header">
                        <div class="card-header-title">
                            Log your exercises
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
            <div class="tile">
                <div class="card">
                    <div class="card-header">
                        <div class="card-header-title">
                            Edit your profile
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