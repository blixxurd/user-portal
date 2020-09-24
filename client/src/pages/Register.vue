<template>
  <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div>
        <h2 class="mt-6 mb-6 text-center text-3xl leading-9 font-extrabold text-gray-800">
          Register a New Account
        </h2>
      </div>
      <form class="mt-8" @submit.prevent="submit">

        <div class="input-item mb-5">
          <label for="username" class="pl-1 font-bold text-xs text-gray-700">Username</label>
          <input aria-label="Username" name="username" type="text" autofill="no" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5" placeholder="desired username">
        </div>

        <div class="input-item mb-5">
          <label for="email" class="pl-1 font-bold text-xs text-gray-700">Email Address</label>
          <input aria-label="Email Address" name="email" type="email" autofill="no" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5" placeholder="you@email.com">
        </div>

        <div class="input-item mb-2">
          <label for="password" class="pl-1 font-bold text-xs text-gray-700">Password</label>
          <input aria-label="Password" name="password" type="password" autofill="no" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5" placeholder="enter password">
        </div>
        <div class="input-item mb-2">
          <input aria-label="Password" name="passwordRepeat" type="password" autofill="no" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5" placeholder="verify password">
        </div>

        <Alerts v-if="feedback.length > 0" class="mt-4 mb-3" type="success" :message="feedback[0]" :icon="true" />

        <div class="mt-6">
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-white group-hover:text-white transition ease-in-out duration-150"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            Complete Registration
          </button>
        </div>

      </form>
    </div>
  </div>
</template>


<script>
  import Alerts from '../components/Alerts.vue';

  export default {
    name: 'Register',
    components: {
      Alerts
    },
    data() {
      return {
        errors: [],
        feedback: []
      }
    },
    methods: {
      submit() {
        this.feedback.push('Your a wizard harry.');
      }
    }
  }
</script>