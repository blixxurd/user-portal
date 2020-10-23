import axios from 'axios';

function API(app) {
  // Initialize Client
  const client = axios.create({
      // .. where we make our configurations
      baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:3000/api/v1' : 'http://local.bouncer.cc:3000/api/v1'
  });

  // Initialize Interceptor
  client.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    const _okErrors = [400, 401, 403, 422]; // Client errors
    if(error.response && _okErrors.indexOf(error.response.status) > -1) {
      const _clientErrors = error.response.data.errors;
      // Special Handler for Auth Errors, since these will occur 
      // on occasion for things like token expirations
      if(app.config.globalProperties.$store.isLoggedIn() && error.response.status == 401 || error.response.status == 403) {
        if(_clientErrors && _clientErrors.length > 0) {
          app.config.globalProperties.$store.state.authErrors.push(_clientErrors[0]);
        }
        app.config.globalProperties.$store.logout();
      }
      if(_clientErrors && _clientErrors.length > 0) {
        return Promise.reject(new Error(_clientErrors[0]));
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  });

  const methods = {
    post: function(path, body) {
      return new Promise((resolve, reject) => {
        const payload = body;
        client.post(path, payload).then(res => {
            return resolve(res.data);
        }).catch(reject);
      });
    },
    get: function(path) {
      return new Promise((resolve, reject) => {
        client.get(path).then(res => {
          return resolve(res.data);
        }).catch(reject);
      });
    }
  }

  const login = (body) => {
    return methods.post('/login', body);
  }

  const register = (body) => {
    return methods.post('/register', body);
  }

  const recover = (body) => {
    return methods.post('/recovery/forgot-password', body);
  }

  const verification = (vid) => {
    return methods.get(`/verification/${vid}`);
  }

  const changePassFromRecovery = (body) => {
    return methods.post('/recovery/reset-password', body);
  }

  // Authenticated
  const getProfile = () => {
    return methods.get('/user/profile');
  }

  // Authenticated
  const updateUser = (body) => {
    return methods.post('/user/update-user', body);
  }

  // Authenticated
  const updateProfile = (body) => {
    return methods.post('/user/update-profile', body);
  }

  return {
    client,
    register, 
    login,
    recover, 
    verification,
    changePassFromRecovery,
    getProfile,
    updateUser,
    updateProfile
  }

}

export default {
  install: (app) => {
    app.config.globalProperties.$api = API(app);
  }
}