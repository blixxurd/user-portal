<template>
  <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div>
        <h2 class="mt-6 mb-6 text-center text-3xl leading-9 font-extrabold text-gray-800">
          Change Your Password
        </h2>
      </div>
      <form class="mt-8" @submit.prevent="submit" v-if="feedback.length == 0">

        <div class="input-item mb-4">
          <label for="password" class="profile-form-label">New Password</label>
          <input v-model="form.password" aria-label="Password" name="password" type="password" autofill="no" required class="profile-form-input" placeholder="enter password">
        </div>
        <div class="input-item mb-2">
          <label for="password" class="profile-form-label">Verify Password</label>
          <input  v-model="form.passwordVerify" aria-label="Password" name="passwordRepeat" type="password" autofill="no" required class="profile-form-input" placeholder="verify password">
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
            Change Password
          </button>
        </div>

      </form>
      <div v-if="feedback.length > 0">
        <Alerts v-if="feedback.length > 0" class="my-3" type="success" :message="feedback[0]" :icon="true" title="Success" />
        <router-link to="/" class="group button-primary">
          Back to Login
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
  import Alerts from '../../components/Alerts.vue';
  import Loader from '../../components/Loader.vue';

  export default {
    name: 'PasswordChange',
    components: {
      Alerts,
      Loader
    },
    props: ['token'],
    data() {
      return {
        loading: false,
        errors: [],
        feedback: [],
        completed: false,
        form: {
          password: null,
          passwordVerify: null,
        }
      }
    },
    methods: {
      submit() {
        this.errors = []; 
        this.feedback = [];
        this.loading = true;
        if(this.form.password && this.form.passwordVerify) {
          if(this.form.password !== this.form.passwordVerify) {
            this.errors.push('Passwords do not match.');
          }
        } else {
          this.errors.push('Please fill in all required fields.');
        }

        if(this.errors.length > 0) {
          this.loading = false;
          return false;
        }

        const _payload = {
          token: this.token,
          password: this.form.password
        };

        this.$api.changePassFromRecovery(_payload).then(() => {
          this.loading = false;
          this.completed = true;
          this.feedback.push(`Your password has been updated!`);
        }).catch(err => {
          this.loading = false;
          this.errors.push(err.message);
        });
      }
    }
  }
</script>