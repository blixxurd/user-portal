<template>
  <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div>
        <h2 class="mt-6 mb-6 text-center text-3xl leading-9 font-extrabold text-gray-800">
          Recover Your Password
        </h2>
      </div>
      <form class="mt-8" @submit.prevent="submit">

        <div>
          <input v-model="email" aria-label="Email Address" name="email" type="email" autofill="no" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email Address">
        </div>

        <Alerts v-if="feedback.length > 0" class="mt-4 mb-3" type="info" :message="feedback[0]" :icon="true" title="Check Your Email" />
        <Alerts v-if="errors.length > 0" class="mt-4 mb-3" type="danger" :message="errors[0]" :icon="true"/>

        <div class="mt-6">
          <button type="submit" class="group button-primary">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-white group-hover:text-white transition ease-in-out duration-150"  fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="!loading">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <Loader size="4" color="white" v-if="loading" />
            </span>
            Send Password Reset
          </button>
        </div>

        <div class="mt-6 text-center text-sm">
          or
        </div>
        <div class="mt-3 text-sm text-center">
          <router-link to="/" class="font-medium text-orange-500 hover:text-orange-400 focus:outline-none focus:underline transition ease-in-out duration-150">
            Back to Login
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
    name: 'Recover',
    components: {
      Alerts,
      Loader
    },
    data() {
      return {
        errors: [],
        feedback: [],
        email: '',
        loading: false
      }
    },
    methods: {
      reset() {
        this.errors = [];
        this.feedback = [];
      },
      submit() {
        this.reset();
        this.loading = true;
        const payload = { email: this.email };
        this.$api.recover(payload).then(res => {
          console.log(res);
          this.feedback.push(`An email containing instructions to reset your password has been emailed to you.`);
          this.email = '';
          this.loading = false;
        }).catch(e => { 
          this.errors.push(e.message);
          this.loading = false;
        });
      }
    }
  }
</script>