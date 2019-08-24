<template>
  <nav>
    <div class="u_container">
      <div class="logo">
        <router-link :to="{ name: 'home' }">
          <div class="svg_container">
            <logo />
          </div>
        </router-link>
      </div>
      <ul class="nav_list">
        <li>
          <router-link :to="{ name: 'about' }">About</router-link>
        </li>
        <li v-if="!isLoggedIn && showLogin">
          <router-link :to="{ name: 'login' }">Login</router-link>
        </li>
        <li v-if="!isLoggedIn && showSignUp">
          <router-link class="special" :to="{ name: 'signup' }">
            Sign Up
          </router-link>
        </li>
        <li v-if="isLoggedIn && this.$route.name !== 'dashboard'">
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
        <li v-if="isLoggedIn">
          <a href="#" class="special" @click.prevent="logoutUser">
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import User from '../lib/User';
import Logo from '../components/Logo.vue';

export default {
  name: 'navbar',
  data: () => ({
    isLoggedIn: false,
    showLogin: true,
    showSignUp: true,
  }),
  components: {
    Logo,
  },
  methods: {
    async verifyToken() {
      if (localStorage.token) {
        // verifying the user's existing token
        User.verify()
          .then(() => {
            this.isLoggedIn = true;
            this.showLogin = false;
            this.showSignUp = false;
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

<style scoped lang="scss">
  $primary-color: #0C9BFA;

  nav {
    height: 80px;
    width: 100%;

    @media (max-width: 568px) {
      height: 50px;
    }

    @media (max-width: 415px) {
      height: auto;
    }

    .u_container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      height: 100%;

      @media (max-width: 568px) {
        justify-content: center;
      }
      @media (max-width: 412px) {
        .logo,
        ul {
          width: 100%;
          text-align: center;
        }

        .svg_container {
          margin: 0 auto;
        }
      }
    }

    .logo {
      transition: all 0.2s ease;
      opacity: 1;

      @media (max-width: 568px) {
        .svg_container {
          height: 24px!important;
          width: 125px;
          svg {
            height: 100%;
            width: auto;
          }
        }
      }

      &:hover {
        opacity: 0.65;
      }
    }

    ul {
      list-style: none;
      @media (max-width: 568px) {
        margin-top: 0;
        margin-bottom: 0;
      }
      @media (max-width: 468px) {
        padding-left: 0;
      }
      @media (max-width: 415px) {
        margin-top: 16px;
      }
      li {
        display: inline-block;
        &:not(:last-of-type) {
          margin-right: 32px;
          @media (max-width: 468px) {
            margin-right: 20px;
          }
        }

        a:link,
        a:visited {
          color: $primary-color;
          font-weight: bold;
          opacity: 1;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        a:hover,
        a:active {
          opacity: 0.5;
        }

        a.special {
          display: inline-block;
          background-color: #fff;
          width: 125px;
          height: 40px;
          border: 3px solid $primary-color;
          text-align: center;
          line-height: 34px;
          border-radius: 5px;
        }
      }
    }
  }
</style>
