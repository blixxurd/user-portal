<template>

  <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      
      <!-- Generic Success --> 
      <div class="success" v-if="$route.params.action == 'success'">
        <div class="flex items-center justify-center" v-if="loading">
          <Loader size="10" color="black" class="" />
          <div class="my-4 font-bold block">
            Verifying... 
          </div>
        </div>
        <div v-if="!loading">
          <Alerts v-if="feedback.length > 0" class="mt-4 mb-3" type="success" :message="feedback[0]" :icon="true" title="Thank you!" />
          
          <div class="back-to-account my-10">
            <router-link to="/" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out">
              Back to Login
            </router-link>
          </div>
        </div>
      </div>

      <div class="success" v-if="$route.params.action == 'expired'">
          <Alerts 
              class="mt-4 mb-3" type="danger" 
              message="Your request has expired. Please try again." 
              :icon="true"
              title="Expired"
          />
          <div class="back-to-account my-10">
            <router-link to="/" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out">
              Back to Login
            </router-link>
          </div>
      </div>

      {{actionId}}
    </div>
  </div>

</template>


<script>
  //import API from '../controllers/api.controller';
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
        loading: true,
        actionId: null
      }
    },
    mounted() {
      this.actionId = this.$route.query.a || null
      setTimeout(() => {
        this.loading = false;
        this.feedback.push('Your verification was successful.');
      }, 1000);
    }
  }
</script>