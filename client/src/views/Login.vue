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
        <p class="control">
          <button class="button is-success">
              Login
          </button>
          <!-- <router-link class="button is-sucess" to="/log">Login</router-link> -->
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import {Login} from "../models/Users";
export default {
  data: () => ({
    email: '',
    password: '',
    error: ''
  }),
  methods: {
    async login(){
      try {
        await Login(this.email, this.password);
        this.$router.push('/profile');
      } catch (error) {
        this.error = error;
      }
    }
  }
}
</script>