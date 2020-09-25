<template>
  <div class="container mx-auto">
      <div>Welcome.</div>
      <a href="javascript:;" @click="logout" class="text-orange-500">Logout</a>
  </div>
</template>


<script>
  export default {
    name: 'Profile',
    data() {
      return {
        token: this.$store.state.token
      }
    },
    methods: {
      logout() {
        this.$store.setState('token', null);
      } 
    }
  }
</script>