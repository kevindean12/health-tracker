<template>
    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
            <a href="/" class="navbar-item">
                <strong class="is-size-6">soundjog</strong>
            </a>
            <span :class="{'is-active': isOpen}" @click="isOpen = !isOpen" class="navbar-burger burger">
                <span></span>
                <span></span>
                <span></span>
            </span>
            </div>
            <div :class="{'is-active': isOpen}" class="navbar-menu">
                <div class="navbar-end">
                    <router-link class="navbar-item" to="/" active-class="is-current" exact>Home</router-link>
                    <router-link class="navbar-item" to="/register" active-class="is-current">Register</router-link>
                    <router-link class="navbar-item" to="/about" active-class="is-current">About</router-link>
                    <router-link class="navbar-item" to="/planner" active-class="is-current">Plan</router-link>
                    <router-link class="navbar-item" to="/profile" active-class="is-current">My Profile</router-link>
                    <router-link class="navbar-item" to="/exerciselog" active-class="is-current">Log</router-link>
                    <router-link class="navbar-item" to="/social" active-class="is-current">Social</router-link>
                    <span v-if="user == null" class="navbar-item">
                        <router-link class="button is-dark" to="login">
                            <span>Login</span>
                            <span class="icon">
                            <i class="fas fa-play"></i>
                            </span>
                        </router-link>
                    </span>
                    <span v-else class="navbar-item">
                        <button @click.prevent="Logout" class="button is-dark">
                            <span>Logout</span>
                            <span class="icon">
                            <i class="fas fa-sign-out-alt"></i>
                            </span>
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import {CurrentUser, Logout} from '../models/Users';
export default {
    data: () => ({
        isOpen: false,
        user: null
    }),
    watch:{
        $route(to, from){
            this.user = CurrentUser;
        }
    },
    methods: {
        Logout
    }
}
</script>

<style>
.is-current{
    font-weight: bold;
    color: cornflowerblue;
}
</style>