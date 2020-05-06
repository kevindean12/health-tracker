<template>
    <div class="container">
        <div class="title is-3">Welcome, {{CurrentUser.Email}} </div>
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
                            <a @click="editProfile" class="navbar-item" href="#">Edit your profile</a> 
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
        <div v-if="edit == true">
            {{error}}
            <div v-if="newName != ''">
                <p class="content">Username updated to: {{newName}}</p>
            </div>
            <form>
                <div class="field">
                    <label class="label">Current Password</label>
                    <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                    </p>
                </div>
                <div class="field">
                    <label class="label">New Password</label>
                    <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="newPassword">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                    </p>
                </div>
                <div class="field">
                    <label class="label">Confirm New Password</label>
                    <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="confirmPassword">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button @click.prevent="changePassword" class="button is-success">
                            Submit Password
                        </button>
                    </p>
                </div>
            </form>
            <form>
                <div class="field">
                    <label class="label">Change Name</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Name" v-model="name">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button @click.prevent="submitName" class="button is-success">
                            Submit Name
                        </button>
                    </p>
                </div>
            </form>
        </div>
        
    </div>
</template>

<script>
import { CurrentUser, ChangeName, ChangePassword } from "../models/Users";

export default {
    data: () => ({
        CurrentUser,
        edit: false,
        name: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
        newName: '',
        error: ''
    }),
    methods: {
        editProfile(){
            this.edit = true;
        },
        async changePassword(){
            if(this.password != ''){
                try{
                    const success = await ChangePassword(this.password, this.newPassword, this.confirmPassword);
                    if(success){
                    this.error = "Success! Now redirecting you to login.";
                    setTimeout(() => this.$router.push('/login'), 3000);
                    
                }
                } catch(error) {
                    this.error = error.message;
                }
                
            }
        },
        async submitName(){
            if(this.name != ''){
                try{
                    const newName = await ChangeName(this.name);
                    this.newName = newName.updated;
                } catch(error){
                    this.error = error.message;
                }
            }
        }
    }
}
</script>

<style>

</style>