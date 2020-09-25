<template>
  <Profile v-if="isLoggedIn" />
  <Login v-else />
</template>


<script>
  import Login from './Login';
  import Profile from './authenticated/Profile.vue';

  export default {
    name: 'Home',
    components: {
      Login,
      Profile
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