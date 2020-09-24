<template>
  <Nav class="mb-6" />
  <router-view />
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
