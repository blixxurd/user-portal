<template>
  <main>
    <AuthenticatedNav />
    <div class="w-full">
      <div class="py-10">
        <h1 class="text-bold text-gray-800 font-bold text-xl">Profile Data</h1>
      </div>
      <div class="p-4 border-4 border-dashed border-gray-200 rounded-lg w-full">
        <form class="max-w-md" @submit.prevent="submit">

          <div class="input-item mb-5">
            <label for="firstName" class="pl-1 font-bold text-xs text-gray-700">First Name</label>
            <input v-model="profile.first_name" aria-label="First Name" name="firstName" type="text" autofill="no" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5">
          </div>

          <div class="input-item mb-5">
            <label for="lastName" class="pl-1 font-bold text-xs text-gray-700">Last Name</label>
            <input v-model="profile.last_name" aria-label="Last Name" name="lastName" type="text" autofill="no" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5">
          </div>

          <div class="input-item mb-5">
            <label for="phoneNumber" class="pl-1 font-bold text-xs text-gray-700">Phone Number</label>
            <input v-model="profile.phone" aria-label="Phone Number" name="phoneNumber" type="phone" autofill="no" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-teal focus:border-gray-400 focus:z-10 sm:text-sm sm:leading-5">
          </div>

          <Alerts v-if="errors.length > 0" class="my-3" type="danger" :message="errors[0]" :icon="true" />
          <Alerts v-if="feedback.length > 0" class="my-3" type="success" :message="feedback[0]" :icon="true" title="Success" />

          <div class="mt-6">
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-white group-hover:text-white transition ease-in-out duration-150"  fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="!loading">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <Loader size="4" color="white" v-if="loading" />
              </span>
              Update Profile
            </button>
          </div>

        </form>
      </div>
    </div>
  </main>
</template>


<script>
  import Loader from '@/components/Loader.vue';
  import Alerts from '@/components/Alerts.vue';
  import AuthenticatedNav from '@/components/AuthenticatedNav.vue';
  export default {
    name: 'EditAccount',
    components: {
      AuthenticatedNav,
      Loader,
      Alerts
    },
    data() {
      return {
        feedback: [],
        loading: false,
        profile: {
          first_name: '',
          last_name: '',
          phone: ''
        },
        errors: [],
      }
    },
    methods: {
      reset() {
        this.errors = [];
        this.feedback = [];
        this.verification = false;
      },
      submit() {
        this.reset();
        this.loading = true;
        this.$api.updateProfile(this.profile).then(acc => {
          console.log(acc);
          this.loading = false;
          this.feedback.push("Your profile has been updated.");
        }).catch(e => {
          this.loading = false;
          this.errors.push(e.message);
        });
      }
    },
    mounted() {
      if(!this.$store.state.profile) {
        this.$api.getProfile().then(res => {
          this.profile = res.profile;
          this.$store.setState('user', res.user);
          this.$store.setState('profile', res.profile);
        }).catch(e => {
          // TODO - Global Error Alert
          console.error(e);
        });
      } else {
        this.profile = JSON.parse(JSON.stringify(this.$store.state.profile));
      }
    },
    computed: {}
  }
</script>