<template>
    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
            <a href="#" class="navbar-item">
                <strong class="is-size-6">healthtracker</strong>
            </a>
            <span class="navbar-burger burger">
                <span></span>
                <span></span>
                <span></span>
            </span>
            </div>
            <div class="navbar-menu">
            <div class="navbar-end">
                <router-link class="navbar-item" to="/">Home</router-link>
                <router-link class="navbar-item" to="/about">About</router-link>
                <span class="navbar-item">
                <router-link class="button is-dark" to="/get-started">
                    <span>Get Started</span>
                    <span class="icon">
                    <i class="fas fa-play"></i>
                    </span>
                </router-link>
                </span>
            </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style>

</style>