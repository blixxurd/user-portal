<template>
  <nav class="bg-white border-b border-gray-200">

    <div class="hidden sm:block">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="hidden sm:-my-px space-x-8 sm:flex">
            <router-link to="/" :class="navClass('/')">
              Dashboard
            </router-link>
            <router-link to="/account" :class="navClass('/account')">
              Account
            </router-link>
            <router-link to="/account/profile" :class="navClass('/account/profile')">
              Profile
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="block sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link to="/" :class="navClass('/', 'mobile')">
          Dashboard {{ $route.params.id }}
        </router-link>

        <router-link to="/account" :class="navClass('/account', 'mobile')">
          Account
        </router-link>

        <router-link to="/account/profile" :class="navClass('/account/profile', 'mobile')">
          Profile
        </router-link>
      </div>
    </div>

  </nav>
</template>


<script>
  export default {
    name: 'AuthenticatedNav',
    data() {
      return {}
    },
    methods: {
      navClass(path, variant="desktop") {
        let _base = variant == 'mobile' ? 'nav-link-mobile' : 'nav-link  nav-link';
        let _activity = this.$route.path == path ? `${_base}-active` : `${_base}-inactive`;
        return _activity;
      },
    },
    mounted() {},
    computed: {

    }
  }
</script>

<style scoped>
  .nav-link {
    @apply inline-flex items-center px-1 pt-1 border-b-2 outline-none;
  }
  .nav-link-inactive {
    @apply border-transparent text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out;
  }
  .nav-link-inactive:hover, .nav-link-inactive:focus {
    @apply text-gray-700 border-gray-300;
  }
  .nav-link-active {
    @apply border-orange-500 text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out;
  }
  .nav-link-active:hover {
    @apply border-orange-700;
  }
  .nav-link-mobile-active {
    @apply block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-base font-medium text-orange-700 transition duration-150 ease-in-out;
  }
  .nav-link-mobile-active:hover, .nav-link-mobile-active:focus {
    @apply outline-none text-orange-800 border-orange-700;
  }
  .nav-link-mobile-inactive:hover, .nav-link-mobile-inactive:focus {
    @apply text-gray-800 border-gray-300 outline-none text-gray-800 border-gray-300;
  }
  .nav-link-mobile-inactive {
    @apply block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 transition duration-150 ease-in-out;
  }
</style>