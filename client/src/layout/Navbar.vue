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
          <router-link
            v-if="isLoggedIn && this.$route.name !== 'dashboard'"
            :to="{ name: 'dashboard' }">
            Dashboard
          </router-link>
          <a href="#" v-if="isLoggedIn" @click.prevent="logoutUser">Logout</a>
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
              this.showLogin = false;
              this.showSignUp = false;
            }
          })
          .catch(() => {
            this.isLoggedIn = false;
            this.showLogin = true;
            this.showSignUp = true;
          });
      } else {
        this.isLoggedIn = false;
        this.showLogin = true;
        this.showSignUp = true;
      }
    },
    logoutUser() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.showLogin = true;
      this.showSignUp = true;
      if (this.$route.name === 'signup') {
        this.showSignUp = false;
      }
      if (this.$route.name === 'login') {
        this.showLogin = false;
      }
      if (this.$route.name !== 'about') {
        this.$router.push({ name: 'home' });
      }
    },
  },
  mounted() {
    if (this.$route.name === 'signup') {
      this.showSignUp = false;
      this.showLogin = true;
    } else if (this.$route.name === 'login') {
      this.showLogin = false;
      this.showSignUp = true;
    } else {
      this.showLogin = true;
      this.showSignUp = true;
    }
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
      } else if (to.name === 'dashboard') {
        this.isLoggedIn = true;
        this.showLogin = false;
        this.showSignUp = false;
      } else {
        this.verifyToken();
      }
    },
  },
};
</script>

<style>

</style>
