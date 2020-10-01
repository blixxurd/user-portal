<template>
  <ProfileHome v-if="isLoggedIn" />
  <Login v-else />
</template>


<script>
  import Login from './Login';
  import ProfileHome from './authenticated/Home.vue';

  export default {
    name: 'Home',
    components: {
      Login,
      ProfileHome
    },
    data() {
      return {

      }
    },
    computed: {
      isLoggedIn() {
        return !!this.$store.state.token;
      }
    }
  }
</script>