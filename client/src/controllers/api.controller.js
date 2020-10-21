import axios from 'axios';

const client = axios.create({
    // .. where we make our configurations
    baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:3000/api/v1' : 'http://local.bouncer.cc:3000/api/v1'
});

const setAuth = (token) => {
  client.defaults.headers = {
    'Authorization': token
  }
}

const deAuth = () => {
  client.defaults.headers = {};
}

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

export default { 
  client,
  setAuth,
  register, 
  login,
  recover, 
  verification,
  changePassFromRecovery,
  getProfile,
  deAuth
};