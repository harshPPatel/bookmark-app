<template>
  <nav>
    <div class="logo">
      <div class="logo">
        <router-link :to="{ name: 'home' }">LOGO</router-link>
      </div>
      <ul class="nav_list">
        <li>
          <router-link :to="{ name: 'about' }">About</router-link>
          <router-link
            v-if="!isLoggedIn && showLogin"
            :to="{ name: 'login' }">
            Login
          </router-link>
          <router-link
            v-if="!isLoggedIn && showSignUp"
            :to="{ name: 'signup' }">
            Sign Up
          </router-link>
          <a href="#" v-if="isLoggedIn">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import config from '../config';

export default {
  name: 'navbar',
  data: () => ({
    isLoggedIn: false,
    showLogin: true,
    showSignUp: true,
  }),
  methods: {
    async verifyToken() {
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
              this.isLoggedIn = true;
            }
          })
          .catch(() => { this.isLoggedIn = false; });
      }
    },
  },
  mounted() {
    this.verifyToken();
  },
  watch: {
    /* eslint-disable no-unused-vars */
    $route(to, from) {
      if (to.name === 'signup') {
        this.showSignUp = false;
        this.showLogin = true;
      } else if (to.name === 'login') {
        this.showLogin = false;
        this.showSignUp = true;
      } else {
        this.showLogin = true;
        this.showSignUp = true;
      }
    },
  },
};
</script>

<style>

</style>
