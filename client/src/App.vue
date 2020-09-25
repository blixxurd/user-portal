<template>
  <div class="main-wrap">
    <Nav class="mb-6" />
    <router-view />
  </div>
</template>

<script>
  import Nav from './components/Nav.vue';

  export default {
    name: 'App',
    components: {
      Nav
    }
  }
</script>

<style>
  .main-wrap {
    position:relative;
  }
</style>
