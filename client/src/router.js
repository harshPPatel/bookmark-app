import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import config from './config';
import About from './views/About.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import ErrorComponent from './views/Error.vue';
import Dashboard from './views/Dashboard.vue';
import DeleteAccount from './views/DeleteAccount.vue';
import AccountDeleteConfirm from './views/AccountDeleteConfirm.vue';
import PageNotFound from './views/404.vue';

Vue.use(Router);

const isLoggedIn = async () => {
  let returnValue = false;

  if (localStorage.token) {
    const API_URL = `${config.API_URL}/auth/verify`;
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.token,
      },
    })
      .then(res => res.json())
      .then((response) => {
        if (response.isUserValid) {
          returnValue = true;
        }
      })
      .catch(() => { returnValue = false; });
  }

  return returnValue;
};

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
        /* eslint-disable consistent-return */
        isLoggedIn()
          .then((res) => {
            if (res) {
              return next('/dashboard');
            }
          });
        return next();
        /* eslint-enable consistent-return */
      },
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      beforeEnter: (to, from, next) => {
        /* eslint-disable consistent-return */
        isLoggedIn()
          .then((res) => {
            if (res) {
              return next('/dashboard');
            }
          });
        return next();
        /* eslint-enable consistent-return */
      },
      component: Signup,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      beforeEnter: (to, from, next) => {
        /* eslint-disable consistent-return */
        isLoggedIn()
          .then((res) => {
            if (res) {
              return next();
            }
          });
        return next('/login');
        /* eslint-enable consistent-return */
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
      beforeEnter: (to, from, next) => {
        /* eslint-disable consistent-return */
        isLoggedIn()
          .then((res) => {
            if (res) {
              return next();
            }
          });
        return next('/login');
        /* eslint-enable consistent-return */
      },
      component: DeleteAccount,
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
