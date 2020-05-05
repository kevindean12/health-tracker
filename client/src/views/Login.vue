<template>
  <div class="login">
    <form class="container" @submit.prevent="login">
      {{error}}
      <div class="field">
        <label class="label">Email</label>
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" maxlength="254" placeholder="Email" v-model="email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password" v-model="password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-success">
              Login
          </button>
        </div>
        <br>
        <div class="control">
          <button class="button is-primary" @click.prevent="google_login" >
              Login with Google
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {Login} from "../models/Users";
const GOOGLE_CLIENT_ID = "461133220931-rk1tihe5p5ni2gabuq0iiua9notq1vbb.apps.googleusercontent.com";
let auth2 = null;
export default {
  created(){
    const googleScriptTag = document.createElement('script')
        googleScriptTag.setAttribute('src', 'https://apis.google.com/js/api:client.js')
        document.head.appendChild(googleScriptTag)
        googleScriptTag.onload = () => {
            // the global gapi variable is created by loading that script
            gapi.load('auth2', () => {
                auth2 = gapi.auth2.init({
                    client_id: GOOGLE_CLIENT_ID,
                    cookiepolicy: 'single_host_origin',
                    scope: 'profile email'
                })
            })
        }
  },
  data: () => ({
    email: '',
    password: '',
    error: '',
    profilePicture: ''
  }),
  methods: {
    async login(){
      try {
        await Login(this.email, this.password);
        this.$router.push('/profile');
      } catch (error) {
        this.error = error;
      }
    },
    google_login(){
            auth2.signIn()
            .then(googleUser =>{
                console.log(googleUser);
                
                const profile = googleUser.getBasicProfile();
                console.log("ID: " + profile.getId()); // Don't send this directly to your server!
                console.log('Full Name: ' + profile.getName());
                console.log('Given Name: ' + profile.getGivenName());
                console.log('Family Name: ' + profile.getFamilyName());
                console.log("Image URL: " + profile.getImageUrl());
                console.log("Email: " + profile.getEmail());
                this.profilePicture = profile.getImageUrl();
                return Login("google", googleUser.getAuthResponse().access_token)
                    .then(x => this.$router.push('/game'))
            } )
            .catch(error => this.error = error.error);
        }
  }
}
</script>