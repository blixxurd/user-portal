<template>
  <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div>
        <h2 class="mt-6 mb-6 text-center text-3xl leading-9 font-extrabold text-gray-800">
          Register a New Account
        </h2>
      </div>
      <form class="mt-8" @submit.prevent="submit" v-if="feedback.length == 0">

        <div class="input-item mb-5">
          <label for="username" class="profile-form-label">Username</label>
          <input v-model="registration.username" aria-label="Username" name="username" type="text" autofill="no" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5" placeholder="desired username">
        </div>

        <div class="input-item mb-5">
          <label for="email" class="profile-form-label">Email Address</label>
          <input v-model="registration.email" aria-label="Email Address" name="email" type="email" autofill="no" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5" placeholder="you@email.com">
        </div>

        <div class="input-item mb-2">
          <label for="password" class="profile-form-label">Password</label>
          <input v-model="registration.password" aria-label="Password" name="password" type="password" autofill="no" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5" placeholder="enter password">
        </div>
        <div class="input-item mb-2">
          <input  v-model="registration.passwordVerify" aria-label="Password" name="passwordRepeat" type="password" autofill="no" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5" placeholder="verify password">
        </div>

        <Alerts v-if="errors.length > 0" class="mt-4 mb-3" type="danger" :message="errors[0]" :icon="true" />

        <div class="mt-6">
          <button type="submit" class="group button-primary">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-white group-hover:text-white transition ease-in-out duration-150"  fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="!loading">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <Loader size="4" color="white" v-if="loading" />
            </span>
            Complete Registration
          </button>
        </div>

      </form>
      <div v-if="feedback.length > 0">
        <Alerts v-if="feedback.length > 0" class="my-3" type="success" :message="feedback[0]" :icon="true" title="Success" />
        <router-link to="/" class="group button-primary">
          Go to Login
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
  import Alerts from '../components/Alerts.vue';
  import Loader from '../components/Loader.vue';

  export default {
    name: 'Register',
    components: {
      Alerts,
      Loader
    },
    data() {
      return {
        errors: [],
        feedback: [],
        loading: false,
        completed: false,
        registration: {
          username: null,
          password: null,
          passwordVerify: null,
          email: null,
        }
      }
    },
    methods: {
      submit() {
        this.errors = []; this.feedback = [];
        if(this.registration.username && this.registration.password && this.registration.passwordVerify && this.registration.email) {
          if(this.registration.password !== this.registration.passwordVerify) {
            this.errors.push('Passwords do not match.');
          }
        } else {
          this.errors.push('Please fill in all required fields.');
        }
        if(this.errors.length == 0) {
          this.loading = true;
          this.$api.register(this.registration).then(res => {
            this.loading = false;
            if(!!res.errors && res.errors.length > 0) {
              this.errors.push(res.errors[0]);
            } else {
              this.completed = true;
              this.feedback.push(`Thanks for registering. An email has been sent to ${res.email} to verify your account.`);
            }
          }).catch(err => {
            this.loading = false;
            this.errors.push(err.message);
          });
        }
      }
    }
  }
</script>