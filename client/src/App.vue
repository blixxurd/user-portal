<template>
  <div id="app">
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

</style>
