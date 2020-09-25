import { reactive } from 'vue'

const store = {
  debug: true,

  state: reactive({
    token: null,
    isLoading: false
  }),

  setState(key, value) {
    if (this.debug) {
      console.log(`Attempting to set value of '${key}'='${value}`);
    }
    this.state[key] = value;
  }

}

export default {
  install: (app) => {
    app.config.globalProperties.$store = store;
  }
}