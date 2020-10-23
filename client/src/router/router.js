import { createWebHistory, createRouter } from 'vue-router';
import Register from '@/pages/Register.vue';
import Recover from '@/pages/Recover.vue';
import Home from '@/pages/Home.vue';
import Actions from '@/pages/Actions.vue';
import ErrorPage from '@/pages/Error.vue';
import EditAccount from '@/pages/authenticated/EditAccount.vue';
import EditProfile from '@/pages/authenticated/EditProfile.vue';

function InstancedRouter(app) {

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
      },
      {
        path: '/account',
        component: EditAccount,
        meta: { requiresAuth: true }
      },
      {
        path: '/account/profile',
        component: EditProfile,
        meta: { requiresAuth: true }
      },
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage },
    ]
  });
  
  
  
  router.beforeEach((to) => {
    if(!!to.meta.requiresAuth && !app.config.globalProperties.$store.isLoggedIn()) {
      router.push('/');
      return false;
    }
    return true;
  });

  return router.install(app);

}

export default InstancedRouter;
