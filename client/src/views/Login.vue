<template>
  <div class="u_container">
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
      <button type="submit" class="u-btn u-btn-primary">Login</button>
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
              this.errors.push(res.message);
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

<style scoped lang="scss">
.u_container {
  text-align: center;
  @media (max-width: 568px) {
    text-align: left;
  }

  h1 {
    margin-top: 100px;
    margin-bottom: 40px;

    @media (max-width: 568px) {
      margin-top: 50px;
      margin-bottom: 30px;
    }
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    input {
      margin-bottom: 24px;

      @media (max-width: 568px) {
        margin-bottom: 16px;
      }
    }
    .u-btn {
      max-width: 350px;
      width: 100%;
      height: 42px;
      font-size: 16px;
      letter-spacing: 1px;
    }
  }
}
</style>
