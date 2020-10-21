import { createWebHistory, createRouter } from 'vue-router';
import Register from '@/pages/Register.vue';
import Recover from '@/pages/Recover.vue';
import Home from '@/pages/Home.vue';
import Actions from '@/pages/Actions.vue';
import ErrorPage from '@/pages/Error.vue';
import EditAccount from '@/pages/authenticated/EditAccount.vue';
import EditProfile from '@/pages/authenticated/EditProfile.vue';

// TODO move these to their own guards file. 
// function removeQueryParams(to) {
//   if (Object.keys(to.query).length)
//     return { path: to.path, query: {}, hash: to.hash }
// }

// function removeHash(to) {
//   if (to.hash) return { path: to.path, query: to.query, hash: '' }
// }

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
      component: EditAccount
    },
    {
      path: '/account/profile',
      component: EditProfile
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorPage },
  ]
});

export default router;
