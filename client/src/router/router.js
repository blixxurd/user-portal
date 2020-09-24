import { createWebHistory, createRouter } from 'vue-router';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import Recover from '@/pages/Recover.vue';

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/recover',
      component: Recover
    },
    {
      path: '/register',
      component: Register
    }
  ]
});

export default router;
