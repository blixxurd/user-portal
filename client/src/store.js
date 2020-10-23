import { reactive } from 'vue';

function ApplicationStore(app) {
  const token = app.config.globalProperties.$auth.token;
  const store = {
    debug: !!(process.env.NODE_ENV == 'development'),
    state: reactive({
      token: token ? token : null,
      isLoading: false,
      user: null,
      profile: null,
      authErrors: [],
      loggedIn: () => {
        return !!token;
      }
    }),
  
    isLoggedIn() {
      return !!this.state.token;
    },
  
    login(token) {
      this.state.token = token;
      app.config.globalProperties.$auth.setAuth(this.state.token);
    },
  
    logout() {
      this.state.token = null;
      this.state.user = null;
      this.state.profile = null;
      app.config.globalProperties.$auth.deAuth();
    },
  
    setState(key, value) {
      if (this.debug) {
        console.log(`Attempting to set value of '${key}'='${value}`);
      }
      this.state[key] = value;
    }
  
  }

  return store;
}

export default {
  install: (app) => {
    app.config.globalProperties.$store = ApplicationStore(app);
  }
}