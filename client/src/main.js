import { createApp } from 'vue'
import router from './router/router';
import App from './App.vue'

// Tailwind
import './assets/styles/index.css';

createApp(App).use(router).mount('#app')
