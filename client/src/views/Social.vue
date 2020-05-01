<template>
  <div class="container">
      <div class="columns">
          <div class="column is-one-quarter sidebar">
              <div class="title is-4">Friends</div>
              <ul>
                  <li v-for="friend in Social.Friends" :key="friend.userID">
                    <span class="tag is-link is-large">{{friend.name}}</span>  
                  </li>
              </ul>
          </div>
          <div class="column is-half">
            <div class="title is-2 has-text-centered">Shared With Me</div>
            <div>
                <div class="card" v-for="(obj, i) in Social.SharedWithMe" :key="i">
                    <div class="card-header">
                        <div class="card-header-title"> {{obj.post.userName}}'s {{obj.type}} </div>
                    </div>
                    <div class="card-content" v-if="obj.type == 'Goal'">
                        <div class="spaced-title">
                            <span class="icon fa-lg">
                                <i class="fas fa-dumbbell"></i> 
                            </span>
                            <div class="title is-4 is-inline">
                                {{obj.post.Strength}} minutes of strength
                            </div>
                        </div>
                        <div class="spaced-title">
                            <span class="icon fa-lg">
                                <i class="fas fa-running"></i> 
                            </span>
                            <div class="title is-4 is-inline">
                                {{obj.post.Cardio}} minutes of cardio
                            </div>
                        </div>
                    </div>
                    <div v-if="obj.type == 'Workout'">
                        <div v-for="pod in obj.post.Podcasts" :key="pod.episodeTitle" class="media">
                            <div class="media-left">
                                <img :src="pod.coverArt" :alt="pod.title" class="image is-128x128">
                            </div>
                            <div v-for="ex in obj.post.Exercises" :key="ex.name">
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
                <p class="title is-4"> {{friendResults.name}} </p>
                <button class="button" @click="requestFriend(friendResults.userID)">Request Friend</button>
            </div>
            <p class="content" v-if="requestedFriend != null">
                Sent friend request to {{requestedFriend}}!
            </p>
            <div>
                <div v-for="req in Social.FriendRequests" :key="req.userID">
                    <p class="title is-5"> {{req.name}} </p>
                    <button class="button" @click="approveFriend(req.userID)">Approve</button>
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
                    name: results.name,
                    email: results.email,
                    userID: results.userID
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