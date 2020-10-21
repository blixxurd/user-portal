<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto">
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
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg class="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, toggle classes based on menu state.

      Open: "block", closed: "hidden"
    -->
    <div class="hidden sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link to="/" class="block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-base font-medium text-orange-700 bg-orange-50 focus:outline-none focus:text-orange-800 focus:bg-orange-100 focus:border-orange-700 transition duration-150 ease-in-out">
          Dashboard {{ $route.params.id }}
        </router-link>

        <router-link to="/account" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">
          Account
        </router-link>

        <router-link to="/account/profile" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">
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
      navClass(path) {
        let _activity = this.$route.path == path ? 'nav-link-active' : 'nav-link-inactive';
        return `nav-link ${_activity}`;
      }
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
</style>