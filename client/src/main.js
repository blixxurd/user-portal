import { createApp } from 'vue'
import router from './router/router';
import App from './App.vue'
import store from './store';

// Tailwind
import './assets/styles/index.css';

createApp(App).use(router).use(store).mount('#app');
