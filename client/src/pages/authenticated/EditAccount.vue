<template>
  <main>
    <AuthenticatedNav />
    <div class="w-full">
      <div class="py-10">
        <h1 class="text-bold text-gray-800 font-bold text-xl">Account Settings</h1>
      </div>
      <div class="p-4 border-4 border-dashed border-gray-200 rounded-lg w-full">
        <form class="max-w-md" @submit.prevent="submit">

          <div class="input-item mb-5">
            <label for="username" class="profile-form-label">Username</label>
            <input v-model="account.username" disabled aria-label="Username" name="username" type="text" autofill="no" required class="profile-form-input" placeholder="desired username">
          </div>

          <div class="input-item mb-5">
            <label for="email" class="profile-form-label">Email Address</label>
            <input v-model="account.email" aria-label="Email Address" name="email" type="email" autofill="no" class="profile-form-input" placeholder="you@email.com">
          </div>

          <div class="input-item mb-2">
            <label for="password" class="profile-form-label">Password</label>
            <input v-model="account.password" aria-label="Password" name="password" type="password" autofill="no" class="profile-form-input" placeholder="enter password">
          </div>
          <div class="input-item mb-2">
            <input  v-model="account.passwordVerify" aria-label="Password" name="passwordRepeat" type="password" autofill="no" class="profile-form-input" placeholder="verify password">
          </div>

          <Alerts v-if="errors.length > 0" class="my-3" type="danger" :message="errors[0]" :icon="true" />
          <Alerts v-if="feedback.length > 0" class="my-3" type="success" :message="feedback[0]" :icon="true" title="Success" />
          <Alerts v-if="verification" class="my-3" type="info" message="Your email change is pending verification. Please check your email, and click the link to verify. " :icon="true" title="Email Pending" />

          <div class="mt-6">
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-white group-hover:text-white transition ease-in-out duration-150"  fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="!loading">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <Loader size="4" color="white" v-if="loading" />
              </span>
              Update Account Info
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
        account: {},
        replica: {},
        errors: [],
        verification: false
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
        let _payload = {};
        if(!!this.account.email && this.account.email !== this.$store.state.user.email) {
          _payload.email = this.account.email;
        }
        if(!!this.account.password) {
          if(this.account.password !== this.account.passwordVerify) {
            return this.errors.push("Passwords do not match.");
          }
          _payload.password = this.account.password;
        }
        this.$api.updateUser(_payload).then(acc => {
          this.loading = false;
          if(acc.pending.length > 0) {
            this.verification = true;
          }
          if(acc.complete.length > 0) {
            this.feedback.push("Your account has been updated.");
            this.account.password = this.account.passwordVerify = "";
          }
        }).catch(e => {
          this.loading = false;
          this.errors.push(e.message);
        });
      }
    },
    mounted() {
      if(!this.$store.state.user) {
        this.$api.getProfile().then(res => {
          this.account = JSON.parse(JSON.stringify(res.user));
          this.$store.setState('user', res.user);
          this.$store.setState('profile', res.profile);
        }).catch(e => {
          // TODO - Global Error Alert
          console.error(e);
        });
      } else {
        this.account = JSON.parse(JSON.stringify(this.$store.state.user));
      }
    },
    computed: {}
  }
</script>