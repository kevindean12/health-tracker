<template>
  <div class="container">
      <div class="columns">
          <div class="column is-three-quarters">
            <div class="title is-2">Shared With Me</div>
            <div class="box">
                <!-- v-for friends' shared items -->
            </div>
          </div>
          <div class="column is-one-quarter">
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
            <div class="box" v-if="friendResults != null">
                <p class="title is-4"> {{friendResults.name}} </p>
                <button class="button" @click="requestFriend(friendResults.userID)">Request Friend</button>
            </div>
            <p class="content" v-if="requestedFriend != null">
                Sent friend request to {{requestedFriend}}!
            </p>
            <div class="box">
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