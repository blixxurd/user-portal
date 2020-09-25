import axios from 'axios';
const client = axios.create({
    // .. where we make our configurations
    baseURL: 'http://localhost:3000/api/v1'
});

const unauthenticated = {
  post: function(path, body) {
    return new Promise((resolve, reject) => {
      const payload = body;
      client.post(path, payload).then(res => {
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

export default { 
  client, 
  register, 
  login,
  recover
};