<template>
    <form class="container" @submit.prevent="register">
        {{error}}  
        <div class="field">
            <label class="label">Email</label>
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email" v-model="email">
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
            <label class="label">Confirm Password</label>
            <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Retype Password" v-model="confirm">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control">
                <button class="button is-success">
                    Register
                </button>
            </p>
        </div>
    </form>
</template>

<script>
import { Register, Login } from "../models/Users";
export default {
    data: () => ({
        email: '',
        password: '',
        confirm: '',
        error: ''
    }),
    methods: {
        register(){
            try{
                Register(this.email, this.password, this.confirm);
                Login(this.email, this.password);
                this.$router.push('/profile');
            }
            catch(error){
                this.error = error;
            }
        }
    }
}
</script>

<style>

</style>