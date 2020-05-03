<template>
    <div class="container">
        <div class="columns">
            <div class="column is-one-quarter sidebar">
                <div class="title is-4">Friends</div>
                <ul>
                    <li v-for="friend in Social.Friends" :key="friend.UserID">
                        <span class="tag is-link is-large">{{friend.Name}}</span>  
                    </li>
                </ul>
            </div>
            <div class="column is-half">
                <div class="title is-2 has-text-centered">Shared With Me</div>
                <div class="card" v-for="(goal, i) in Social.SharedWithMe.goals" :key="i">
                    <div class="card-header">
                        <div class="card-header-title"> {{goal.userName}}'s Goal </div>
                    </div>
                    <div class="card-content">
                        <div class="spaced-title">
                            <span class="icon fa-lg">
                                <i class="fas fa-dumbbell"></i> 
                            </span>
                            <div class="title is-4 is-inline">
                                {{goal.Strength.Amount}} minutes of strength
                            </div>
                        </div>
                        <div class="spaced-title">
                            <span class="icon fa-lg">
                                <i class="fas fa-running"></i> 
                            </span>
                            <div class="title is-4 is-inline">
                                {{goal.Cardio.Amount}} minutes of cardio
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="card-footer-item">
                            <button class="button is-danger">Friendly challenge!</button>
                        </div>
                        <div class="card-footer-item">
                            <button class="button is-success">Encourage!</button>
                        </div>
                    </div>
                </div>
                <div class="card" v-for="(workout, i) in Social.SharedWithMe.workouts" :key="i">
                    <div class="card-header">
                        <div class="card-header-title"> {{workout.userName}}'s Workout </div>
                    </div>
                    <div class="card-content">
                        <div v-for="pod in workout.Podcasts" :key="pod.episodeTitle">
                            <div class="media">
                                
                                <img :src="pod.coverArt" :alt="pod.title" class="image is-128x128">
                            
                            </div>
                            <div v-for="ex in workout.Exercises" :key="ex.name" class="is-block">
                                <p class="title is-6 spaced-title">
                                    {{ex.name}} for {{ex.time}} 
                                </p>
                            </div> 
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="card-footer-item">
                            <button class="button is-danger">Friendly challenge!</button>
                        </div>
                        <div class="card-footer-item">
                            <button class="button is-success">Encourage!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-one-quarter sidebar">
                <form @submit.prevent="searchFriends">
                    <div class="field">
                        <div class="control">
                            <label class="label">Find Friends</label>
                            <input type="email" placeholder="name@domain.com" v-model="friendSearch">
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
                {{error}}
                <div v-if="friendResults != null">
                    <p class="title is-4"> {{friendResults.Name}} </p>
                    <button class="button" @click="requestFriend(friendResults.UserID)">Request Friend</button>
                </div>
                <p class="content" v-if="requestedFriend != null">
                    Sent friend request to {{requestedFriend}}!
                </p>
                <div>
                    <div v-for="req in Social.FriendRequests" :key="req.UserID">
                        <p class="title is-5"> {{req.Name}} </p>
                        <button class="button" @click="approveFriend(req.UserID)">Approve</button>
                    </div>
                </div>
                <p class="content" v-if="newFriend != null">
                    {{newFriend}} is now your friend!
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import Social from "../models/Social.js";
export default {
    created(){
        Social.start();
    },
    data: () => ({
        friendSearch: "",
        Social,
        friendResults: null,
        error: "",
        newFriend: null,
        requestedFriend: null
    }),
    methods: {
        async searchFriends(){
            const results = await Social.searchFriends(this.friendSearch);
            if(results){
                this.friendResults = {
                    Name: results.Name,
                    Email: results.Email,
                    UserID: results.UserID
                };
            }
            else{
                this.error = "No results found.";
            }
        },
        async requestFriend(userID){
            const results = await Social.requestFriend(userID);
            this.requestedFriend = results.requestedFriend.Name;
        },
        async approveFriend(userID){
            const results = await Social.approveFriend(userID);
            this.newFriend = results.newFriend.Name;
        }
    }
}
</script>

<style lang="scss">
.card{
    margin: 2em;
}
.spaced-title{
    margin: 1em;
}
.sidebar{
    margin-top: 3rem;
}
</style>