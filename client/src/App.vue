<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>


<script>
import Nav from '@/components/Nav.vue';
import {CurrentUser} from '@/models/Users';
export default {
  components: {
    Nav,
  }
}
</script>

<style lang="scss">

</style>
