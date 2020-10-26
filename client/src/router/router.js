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
        component: Home,
        meta: {title: app.config.globalProperties.$store.isLoggedIn() ? 'Account Home' : 'Login'}
      },
      {
        path: '/recover',
        component: Recover,
        meta: {title: 'Recover Account'}
      },
      {
        path: '/register',
        component: Register,
        meta: {title: 'Register an Account'}
      },
      {
        path: '/a/:action',
        component: Actions,
        meta: {title: 'Verification'}
      },
      {
        path: '/account',
        component: EditAccount,
        meta: { requiresAuth: true, title: 'Account' }
      },
      {
        path: '/account/profile',
        component: EditProfile,
        meta: { requiresAuth: true, title: 'Profile' }
      },
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage, meta: { title: 'Not Found' } },
    ]
  });
  
  router.afterEach((to) => {
    if(!!to.meta.title) {
      document.title = `${to.meta.title} | User Portal`;
    } else {
      document.title =  `${to.path} | User Portal`;
    }
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
