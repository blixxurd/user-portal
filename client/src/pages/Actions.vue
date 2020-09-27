<template>

  <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="flex items-center justify-center" v-if="loading">
        <Loader size="10" color="black" class="" />
      </div>
      
      <!-- Generic Success --> 
      <div class="success" v-if="$route.params.action == 'success'">
        <div v-if="!loading">
          <Alerts class="mt-4 mb-3" type="success" message="Your verification has been completed successfully. ✌️" :icon="true" title="Thank you!" />
          
          <div class="back-to-account my-10">
            <router-link to="/" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out">
              Back to Login
            </router-link>
          </div>
        </div>
      </div>

      <!-- Items that require a ping back -->
      <div v-else-if="verificationData && !error">
        <div class="password-reset" v-if="$route.params.action == 'reset-password'">
          <PasswordChange :token="actionId" />
        </div>
        <div class="error-messaging" v-else>
            <Alerts
              class="mt-4 mb-3"
              type="danger"
              :message="`This ${type} link is no longer active.`"
              :icon="true"
              title="Expired"
              v-if="verificationData.expired"
            />
            <div class="back-to-account my-10" v-if="verificationData.expired">
              <router-link to="/" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out">
                Back to Login
              </router-link>
            </div>
            <Error v-if="verificationData.handled" />
        </div>


      </div>

      <Error v-else />

    </div>
  </div>

</template>


<script>
  import Error from '../pages/Error.vue';
  import API from '../controllers/api.controller';
  import Alerts from '../components/Alerts.vue';
  import Loader from '../components/Loader.vue';
  import PasswordChange from '../pages/actions/PasswordChange.vue'

  const types = {
    'new-account': 'Account Verification',
    'email-change': 'Email Change',
    'password-recovery': 'Password Recovery'
  };

  export default {
    name: 'Recover',
    components: {
      Alerts,
      Loader, 
      Error,
      PasswordChange
    },
    data() {
      return {
        error: false,
        loading: true,
        actionId: null,
        verificationData: null
      }
    },
    methods: {
      killLoader() {
        this.loading = false;
        return true;
      }
    },
    computed: {
      type() {
        return typeof types[this.verificationData.type] !== 'undefined' ? types[this.verificationData.type] : "Verification Link";
      }
    },
    mounted() {

      this.actionId = this.$route.query.a || null;

      // For errors, we need to check why the error was thrown.
      if(this.actionId) {
        API.verification(this.actionId).then(v => {
          this.loading = false;
          this.verificationData = v;
        }).catch(e => {
          console.error(e);
          this.loading = false;
          this.error = true;
        });
      } else {
        this.loading = false;
      }

    }
  }
</script>