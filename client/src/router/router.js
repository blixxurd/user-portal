import { createWebHistory, createRouter } from 'vue-router';
import Register from '@/pages/Register.vue';
import Recover from '@/pages/Recover.vue';
import Home from '@/pages/Home.vue';
import Actions from '@/pages/Actions.vue';

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/recover',
      component: Recover
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/a/:action',
      component: Actions
    }
  ]
});

export default router;
