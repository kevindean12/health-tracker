<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
    <Footer></Footer>
  </div>
</template>


<script>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
export default {
  components: {
    Nav,
    Footer
  }
}
</script>

<style lang="scss">

</style>
