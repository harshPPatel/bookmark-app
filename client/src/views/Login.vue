<template>
  <div class="container">
    <h1>Login<span class="u-primary">.</span></h1>
    <p
      class="error"
      v-for="(error, index) in errors"
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
        @input="validateInput"
        v-bind:class="isValidUsername ? '' : 'invalid'">
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        v-model="password"
        required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import config from '../config';

export default {
  name: 'login',
  data: () => ({
    username: '',
    password: '',
    isLoading: false,
    errors: [],
    isValid: false,
    isValidUsername: true,
  }),
  methods: {
    validateInput() {
      this.errors = [];
      if (this.username.trim().length === 0) {
        this.isValid = false;
        this.isValidUsername = false;
        this.errors.push('Username is required!');
      } else {
        this.isValid = true;
        this.isValidUsername = true;
      }
    },
    submitForm() {
      this.validateInput();
      if (this.isValid) {
        const user = {
          username: this.username.trim(),
          password: this.password.trim(),
        };
        const API_URL = `${config.API_URL}/auth/login`;
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
              this.errors = res.message;
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
      }
    },
  },
};
</script>

<style>

</style>
