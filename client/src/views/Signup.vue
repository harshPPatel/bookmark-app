<template>
  <div class="container">
    <h1>Sign Up<span class="u-primary">.</span></h1>
    <p
      class="error"
      v-for="(error, index) in errors.server"
      :key="index">
      {{ error }}
    </p>
    <p
      class="error"
      v-for="(error, index) in errors.username"
      :key="index">
      {{ error }}
    </p>
    <p
      class="error"
      v-for="(error, index) in errors.password"
      :key="index">
      {{ error }}
    </p>
    <p
      class="error"
      v-for="(error, index) in errors.confirmPassword"
      :key="index">
      {{ error }}
    </p>
    <form @submit.prevent="submitForm">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        v-model="username"
        required
        @input="validateUsername"
        v-bind:class="isValidUsername ? '' : 'invalid'"
        autofocus>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        v-model="password"
        @input="validatePassword"
        required
        v-bind:class="isValidPassword ? '' : 'invalid'">
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        @input="validateConfirmPassword"
        required
        v-bind:class="isValidConfirmPassword ? '' : 'invalid'">
      <button
        type="submit"
        :disabled="username.trim().length === 0 && password.trim().length === 0">
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
import config from '../config';

export default {
  name: 'sign-up',
  data: () => ({
    username: '',
    password: '',
    confirmPassword: '',
    isValidUsername: false,
    isValidPassword: false,
    isValidConfirmPassword: false,
    errors: {
      username: [],
      password: [],
      confirmPassword: [],
      server: [],
    },
  }),
  methods: {
    validateUsername() {
      this.errors.username = [];
      const usernameLength = this.username.trim().length;
      if (usernameLength === 0) {
        this.isValidUsername = false;
        this.errors.username.push('Username is required');
      } else if (usernameLength < 2) {
        this.isValidUsername = false;
        this.errors.username.push('Username should have atleast two characters!');
      } else if (usernameLength > 30) {
        this.isValidUsername = false;
        this.errors.username.push('Username should not be greatere than 30 characters!');
      } else if (!this.username.trim().match(/(^[a-zA-Z0-9_]+$)/)) {
        this.isValidUsername = false;
        this.errors.username.push('Username can only have numbers, alphabets and underscores.');
      } else {
        this.isValidUsername = true;
      }
    },
    validatePassword() {
      this.errors.password = [];
      if (this.password.trim().length === 0) {
        this.isValidPassword = false;
        this.errors.password.push('Password is required');
      } else if (this.password.trim().length < 6) {
        this.isValidPassword = false;
        this.errors.password.push('Password should atleast have 6 characters');
      } else {
        this.isValidPassword = true;
      }
    },
    validateConfirmPassword() {
      this.errors.confirmPassword = [];
      if (this.isValidPassword) {
        if (this.password.trim() !== this.confirmPassword.trim()) {
          this.isValidConfirmPassword = false;
          this.errors.confirmPassword = ['Confirm password does not match with original password.'];
        } else {
          this.isValidConfirmPassword = true;
        }
      }
    },
    submitForm(e) {
      const user = {
        username: '',
        password: '',
      };
      if (this.isValidConfirmPassword && this.isValidUsername && this.isValidPassword) {
        user.username = this.username.trim();
        user.password = this.password.trim();
        const API_URL = `${config.API_URL}/auth/signup`;
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...user }),
        })
          .then(res => res.json())
          .then((res) => {
            if (res.username) {
              localStorage.token = `Bearer ${res.authToken}`;
              this.$router.push({ name: 'dashboard' });
            } else {
              this.errors.server = res.message;
            }
          })
          .catch((err) => {
            this.$router.push({
              name: 'error',
              params: {
                errorCode: err.error,
                errorMessage: err.message,
              },
            });
          });
      } else {
        if (!this.isValidConfirmPassword) {
          e.target.confirmPassword.focus();
        }
        if (!this.isValidPassword) {
          e.target.password.focus();
        }
        if (!this.isValidUsername) {
          e.target.username.focus();
        }
      }
    },
  },
};
</script>

<style>

</style>
