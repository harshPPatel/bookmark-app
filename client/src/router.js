import Vue from 'vue';
import Router from 'vue-router';
import User from './lib/User';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import ErrorComponent from './views/Error.vue';
import Dashboard from './views/Dashboard.vue';
import DeleteAccount from './views/DeleteAccount.vue';
import AccountDeleteConfirm from './views/AccountDeleteConfirm.vue';
import PageNotFound from './views/404.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: (to, from, next) => {
        User.verify()
          .then(() => next('/dashboard'))
          .catch(() => next());
        return next();
      },
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      beforeEnter: (to, from, next) => {
        User.verify()
          .then(() => next('/dashboard'))
          .catch(() => next());
        return next();
      },
      component: Signup,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      beforeEnter: (to, from, next) => {
        User.verify()
          .then(() => next())
          .catch(() => next('/login'));
        return next();
      },
      component: Dashboard,
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorComponent,
    },
    {
      path: '/deleteAccount',
      name: 'deleteAccount',
      component: DeleteAccount,
      beforeEnter: (to, from, next) => {
        User.verify()
          .then(() => next())
          .catch(() => next('/login'));
        return next();
      },
    },
    {
      path: '/accountDeleteConfirm',
      name: 'accountDeleteConfirm',
      component: AccountDeleteConfirm,
    },
    {
      path: '*',
      name: 'pageNotFound',
      component: PageNotFound,
    },
  ],
});
