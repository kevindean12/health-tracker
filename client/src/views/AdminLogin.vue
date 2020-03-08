<template>
    <form class="container" @submit.prevent="adminlogin">
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
        </p>
      </div>
    </form>
</template>

<script>
import { CurrentUser, AdminLogin } from "../models/Users";
export default {
    data: () => ({
    email: '',
    password: '',
    error: ''
  }),
  methods: {
    adminlogin(){
      try {
        AdminLogin(this.email, this.password);
        this.$router.push('/admin');
      } catch (error) {
        this.error = error;
      }
    }
  }
}
</script>

<style>

</style>