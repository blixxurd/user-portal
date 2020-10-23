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

<style>

</style>