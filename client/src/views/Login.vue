<template>
  <div class="u_container">
    <h1>Login<span class="u-primary">.</span></h1>
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
    <form @submit.prevent="submitForm">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        v-model="username"
        required
        @input="validateUsername">
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        v-model="password"
        required
        @input="validatePassword">
      <button
        type="submit"
        class="u-btn u-btn-primary"
        :disabled="!(isValidUsername && isValidPassword)">Login</button>
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
    errors: {
      username: [],
      server: [],
      password: [],
    },
    isValidUsername: false,
    isValidPassword: false,
  }),
  methods: {
    validateUsername(e) {
      this.errors.username = [];
      this.isValidUsername = false;
      const usernameLength = this.username.trim().length;
      if (usernameLength === 0) {
        e.target.classList.add('invalid');
        this.errors.username.push('Username is required');
      } else if (usernameLength < 2) {
        e.target.classList.add('invalid');
        this.errors.username.push('Username should have atleast two characters!');
      } else if (usernameLength > 30) {
        e.target.classList.add('invalid');
        this.errors.username.push('Username should not be greatere than 30 characters!');
      } else if (!this.username.trim().match(/(^[a-zA-Z0-9_]+$)/)) {
        e.target.classList.add('invalid');
        this.errors.username.push('Username can only have numbers, alphabets and underscores.');
      } else {
        e.target.classList.remove('invalid');
        this.isValidUsername = true;
      }
    },
    validatePassword(e) {
      this.errors.password = [];
      this.isValidPassword = false;
      if (this.password.trim().length === 0) {
        e.target.classList.add('invalid');
        this.errors.password.push('Password is required');
      } else if (this.password.trim().length < 6) {
        e.target.classList.add('invalid');
        this.errors.password.push('Password should atleast have 6 characters');
      } else {
        e.target.classList.remove('invalid');
        this.isValidPassword = true;
      }
    },
    submitForm(e) {
      if (this.isValidUsername && this.isValidPassword) {
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
