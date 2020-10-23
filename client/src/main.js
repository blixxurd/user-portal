import { createApp } from 'vue'
import router from '@/router/router';
import App from '@/App.vue'
import store from '@/store';
import API from '@/controllers/api.controller';
import Auth from '@/controllers/auth.controller';

// Tailwind
import './assets/styles/index.css';

createApp(App).use(API).use(Auth).use(store).use(router).mount('#app');
