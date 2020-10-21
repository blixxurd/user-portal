<template>
    <main>
      <AuthenticatedNav />
      <div class="authenticated" v-if="user">

        <div class="py-10">
          <h1 class="text-bold text-gray-800 font-bold text-xl">Welcome, {{user.username}}!</h1>
        </div>

        <div class="flex">

          <div class="w-1/2 rounded overflow-hidden shadow-lg border-orange-500 border-t-2">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">This is a profile box</div>
              <p class="text-gray-700 text-base">
                Pages below are examples for editing account & profile.
              </p>
              <hr class="my-3">
              <router-link to="/account" class="pb-3 font-medium text-orange-500 hover:text-orange-400 focus:outline-none focus:underline transition ease-in-out duration-150 block">
                Edit Account
              </router-link>
              <router-link to="/account/profile" class="pb-3 font-medium text-orange-500 hover:text-orange-400 focus:outline-none focus:underline transition ease-in-out duration-150 block">
                Edit Profile
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
</template>


<script>
  import AuthenticatedNav from '@/components/AuthenticatedNav.vue';
  export default {
    name: 'ProfileHome',
    components: {
      AuthenticatedNav
    },
    data() {
      return {
        token: this.$store.state.token
      }
    },
    methods: {
      logout() {
        this.$store.setState('token', null);
      }
    },
    mounted() {
      if(!this.$store.state.user) {
        this.$api.getProfile().then(res => {
          this.$store.setState('user', res.user);
        }).catch(e => {
          console.error(e);
        });
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    }
  }
</script>