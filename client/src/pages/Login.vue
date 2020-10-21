<template>
  <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div>
        <h2 class="mt-6 mb-6 text-center text-3xl leading-9 font-extrabold text-gray-800">
          Sign in
        </h2>
      </div>
      <form class="mt-8" @submit.prevent="submit">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm">
          <div>
            <input v-model="form.username" aria-label="Username" name="username" type="text" autofill="no" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5" placeholder="Username">
          </div>
          <div class="-mt-px">
            <input v-model="form.password" aria-label="Password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password">
          </div>
        </div>

        <Alerts v-if="errors.length > 0" class="mt-4 mb-3" type="danger" :message="errors[0]" :icon="true" />

        <div class="mt-6 flex items-center justify-between text-right">
          <div class="text-sm leading-5">
            <router-link to="/recover" class="font-medium text-orange-500 hover:text-orange-400 focus:outline-none focus:underline transition ease-in-out duration-150">
              Forgot your password?
            </router-link>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-white group-hover:text-white transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20" v-if="!loading">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              <Loader size="4" color="white" v-if="loading" />
            </span>
            Sign in
          </button>
        </div>
        <div class="mt-6 text-center text-sm">
          or
        </div>
        <div class="mt-3 text-sm text-center">
          <router-link to="/register" class="font-medium text-orange-500 hover:text-orange-400 focus:outline-none focus:underline transition ease-in-out duration-150">
            Register an Account
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
  import Alerts from '../components/Alerts.vue';
  import Loader from '../components/Loader.vue';

  export default {
    name: 'Login',
    components: {
      Alerts,
      Loader
    },
    data() {
      return {
        errors: [],
        form: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    mounted() {
      if(this.$store.state.authErrors.length > 0) {
        this.errors = this.$store.state.authErrors;
      }
    },
    methods: {
      clearOutput() {
        this.errors = [];
        this.$store.state.authErrors = [];
      },
      submit() {
        this.errors = [];
        this.loading = true;
        this.$api.login(this.form).then(body => {
          this.loading = false;
          this.$store.login(body.token);
        }).catch((err) => {
          this.loading = false;
          this.errors.push(err.message);
        });
      }
    }
  }
</script>