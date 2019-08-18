import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import config from './config';

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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
