<template>
  <div class="u_container">
    <h1>Login<span class="u-primary">.</span></h1>
    <error-component :errors="errors.server" />
    <error-component :errors="errors.username" />
    <error-component :errors="errors.password" />
    <form @submit.prevent="submitForm">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        v-model="username"
        required
        @input="validateUsername"
        autofocus>
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
        :disabled="(!(isValidUsername && isValidPassword)) || isLoading">
        {{ isLoading ? 'Logging In...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script>
import ErrorComponent from '../components/Error.vue';
import User from '../lib/User';

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
  components: {
    ErrorComponent,
  },
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
        this.isLoading = true;
        // Logging the User
        User.login(user)
          .then(() => {
            this.isLoading = false;
            this.$router.push({ name: 'dashboard' });
          })
          .catch((err) => {
            this.isLoading = false;
            this.errors.server = err.message;
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
