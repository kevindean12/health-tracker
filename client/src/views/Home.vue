<template>
  <section class="hero is-large is-bold has-background-image">  
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title has-text-white-ter">
          healthtracker
        </p>
        <p class="subtitle has-text-white-ter">
          don't worry, we aren't keeping this silly generic name
        </p>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  }
}
</script>

<style lang="scss">
  .hero {
      background-image: url(../assets/running.jpg);
      background-repeat: no-repeat;
      background-size: cover;
  }

  @media screen and (max-width: 768px) {
    .hero {
      height: 100%;
    }
  }
</style>
