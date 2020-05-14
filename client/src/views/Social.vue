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
                <div class="card" v-for="goal in Social.SharedWithMe.goals" :key="goal._id">
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
                        <!-- future feature -->
                        <!-- <div class="card-footer-item">
                            <button class="button is-danger">Friendly challenge!</button>
                        </div>
                        <div class="card-footer-item">
                            <button class="button is-success">Encourage!</button>
                        </div> -->
                    </div>
                </div>
                <div class="card" v-for="workout in Social.SharedWithMe.workouts" :key="workout._id">
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
                        <!-- future feature: -->
                        <!-- <div class="card-footer-item">
                            <button class="button is-danger">Friendly challenge!</button>
                        </div>
                        <div class="card-footer-item">
                            <button class="button is-success">Encourage!</button>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="column is-one-quarter sidebar">
                <form @submit.prevent="searchFriends">
                    <div class="field">
                        <!-- <div class="control">
                            <label class="label">Find Friends by Email</label>
                            <input type="email" placeholder="name@domain.com" v-model="friendSearch">
                        </div> -->
                        <template>
                            <section>
                                <!-- <p class="content"><b>Selected:</b> {{ selected }}</p> -->
                                <b-field label="Find friends by name">
                                    <b-autocomplete
                                        :data="friendResults"
                                        placeholder="e.g. Kevin"
                                        field="Name"
                                        icon="magnify"
                                        :loading="isFetching"
                                        @typing="searchFriends"
                                        @select="option => selected = option">
                                        <template slot="empty">No results found</template>
                                        <template slot-scope="props">
                                            <div class="title is-4">
                                                {{props.option.Name}}
                                            </div>
                                            <div class="title is-4">
                                                {{props.option.Email}}
                                            </div>
                                        </template>
                                    </b-autocomplete>
                                </b-field>
                            </section>
                        </template>
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
                <div v-if="selected != null">
                    <p class="title is-4"> {{selected.Name}} </p>
                    <button class="button" @click="requestFriend(friendResults.UserID)">Request Friend</button>
                </div>
                <p class="content" v-if="requestedFriend != null">
                    Sent friend request to {{requestedFriend}}!
                </p>
                <div>
                    <h1 class="title is-5 spaced-title">Friend Requests</h1>
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
import debounce from 'lodash/debounce';
export default {
    created(){
        Social.start(); 
    },
    data: () => ({
        friendSearch: "",
        Social,
        friendResults: [],
        selected: null,
        isFetching: false,
        error: "",
        newFriend: null,
        requestedFriend: null
    }),
    methods: {
        // async searchFriends(){
        //     try{
        //         const results = await Social.searchFriends(this.friendSearch);
        //         if(results){
        //             this.friendResults = {
        //                 Name: results.Name,
        //                 Email: results.Email,
        //                 UserID: results.UserID
        //             };
        //         }
        //         else{
        //             throw Error("No results found.");
        //         }
        //     } catch(error) {
        //         this.error = error.message;
        //     }
            
        // },
        searchFriends: debounce( async function (name) {
            try{
                this.isFetching = true;
                const results = await Social.searchFriends(name);
                this.friendResults = [];
                results.friends.forEach(x => this.friendResults.push(x));
                this.isFetching = false;
            } catch(error) {
                this.error = error;
            }
        }),
        async requestFriend(userID){
            try{
                const results = await Social.requestFriend(userID);
                this.requestedFriend = results.requestedFriend.Name;
            } catch(error) {
                this.error = error.message;
            }
            
        },
        async approveFriend(userID){
            try{
                const results = await Social.approveFriend(userID);
                this.newFriend = results.newFriend.Name;
            } catch(error) {
                this.error = error.message;
            }
            
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