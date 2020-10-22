<template>
  <nav class="flex items-center flex-wrap bg-gray-900 p-4">
    <div class="container mx-auto flex items-center">

      <div class="flex items-center flex-shrink-0 text-white">
        <img src="/images/logo_white.svg" class="h-10 mr-4">
        <span class="font-semibold text-xl tracking-tight">User Portal</span>
      </div>

      <div class="block flex ml-4 justify-self-end flex-grow text-right">
        <div class="text-sm flex-grow" v-if="loggedIn">
          <router-link to="/" class="block inline-block mt-0 text-white hover:text-white mr-4">
            Dashboard
          </router-link>
          <a @click="logout" href="javascript:;" class="block inline-block mt-0 text-white hover:text-white mr-4">
            Logout
          </a>
        </div>

        <div class="text-sm flex-grow" v-else>
          <router-link to="/" class="block inline-block mt-0 text-white hover:text-white mr-4">
            Login
          </router-link>
          <router-link to="/register" class="block inline-block mt-0 text-white hover:text-white mr-4">
            Register
          </router-link>
        </div>

      </div>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    logout() {
      this.$store.logout();
    }
  },
  computed: {
    loggedIn() {
      return this.$store.isLoggedIn();
    }
  }
}
</script>