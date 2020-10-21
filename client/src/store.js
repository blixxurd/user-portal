import { reactive } from 'vue';
import API from './controllers/api.controller';

const token = window.localStorage.getItem('authToken');

const store = {
  debug: true,

  state: reactive({
    token: token ? token : null,
    isLoading: false,
    user: null,
    profile: null,
    authErrors: []
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

// Set up Interceptors
API.client.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const _okErrors = [400, 401, 403, 422]; // Client errors
  if(error.response && _okErrors.indexOf(error.response.status) > -1) {
    const _clientErrors = error.response.data.errors;
    // Special Handler for Auth Errors, since these will occur 
    // on occasion for things like token expirations
    if(store.isLoggedIn() && error.response.status == 401 || error.response.status == 403) {
      if(_clientErrors && _clientErrors.length > 0) {
        store.state.authErrors.push(_clientErrors[0]);
      }
      store.logout();
    }
    if(_clientErrors && _clientErrors.length > 0) {
      return Promise.reject(new Error(_clientErrors[0]));
    }
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

export default {
  install: (app) => {
    app.config.globalProperties.$store = store;
    app.config.globalProperties.$api = API;
  }
}