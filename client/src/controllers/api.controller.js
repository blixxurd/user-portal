import axios from 'axios';
const client = axios.create({
    // .. where we make our configurations
    baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:3000/api/v1' : '/api/v1'
});

client.interceptors.response.use(function(response) {
  return response;
},function(error) {
  const _okErrors = [400, 401, 403, 422]; // Client errors
  if(error.response && _okErrors.indexOf(error.response.status) > -1) {
    const _clientErrors = error.response.data.errors;
    if(_clientErrors && _clientErrors.length > 0) {
      return Promise.reject(new Error(_clientErrors[0]));
    }
    return Promise.reject(error);
  }
  return Promise.reject(error);
});

const unauthenticated = {
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
  return unauthenticated.post('/login', body);
}

const register = (body) => {
  return unauthenticated.post('/register', body);
}

const recover = (body) => {
  return unauthenticated.post('/recovery/forgot-password', body);
}

const verification = (vid) => {
  return unauthenticated.get(`/verification/${vid}`);
}

const changePassFromRecovery = (body) => {
  return unauthenticated.post('/recovery/reset-password', body);
}

export default { 
  client, 
  register, 
  login,
  recover, 
  verification,
  changePassFromRecovery
};