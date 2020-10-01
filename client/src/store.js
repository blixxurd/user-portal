import { reactive } from 'vue';
import API from './controllers/api.controller';

const token = window.localStorage.getItem('authToken');

const store = {
  debug: true,

  state: reactive({
    token: token ? token : null,
    isLoading: false,
    user: null,
    profile: null
  }),

  isLoggedIn() {
    return !!this.state.token;
  },

  login(token) {
    window.localStorage.setItem('authToken', token);
    this.state.token = token;
    API.setAuth(this.state.token);
  },

  logout() {
    this.state.token = null;
    this.state.user = null;
    this.state.profile = null;
    window.localStorage.removeItem('authToken');
    API.deAuth();
  },

  setState(key, value) {
    if (this.debug) {
      console.log(`Attempting to set value of '${key}'='${value}`);
    }
    this.state[key] = value;
  }

}

// If a token is sitting around, make sure to set the API Auth header
if(token) {
  API.setAuth(token);
}

export default {
  install: (app) => {
    app.config.globalProperties.$store = store;
    app.config.globalProperties.$api = API;
  }
}