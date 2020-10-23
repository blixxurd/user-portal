function AuthController(app) {

  let storedToken = window.localStorage.getItem('authToken');
  let token;
  
  const setAuth = (authorizationToken) => {
    if(!storedToken) {
      window.localStorage.setItem('authToken', authorizationToken);
      storedToken = authorizationToken;
    }
    token = authorizationToken;
    app.config.globalProperties.$api.client.defaults.headers = {
      'Authorization': authorizationToken
    };
  }

  const deAuth = () => {
    window.localStorage.removeItem('authToken');
    token = storedToken = null;
    app.config.globalProperties.$api.client.defaults.headers = {};
  }

  if(!!storedToken) {
    setAuth(storedToken);
  }

  return {
    token,
    deAuth,
    setAuth
  }
}

export default {
  install: (app) => {
    app.config.globalProperties.$auth = AuthController(app);
  }
}