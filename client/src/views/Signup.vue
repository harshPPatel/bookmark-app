<template>
  <div class="u_container">
    <h1>Sign Up<span class="u-primary">.</span></h1>
    <error-component :errors="errors.server" />
    <error-component :errors="errors.username" />
    <error-component :errors="errors.password" />
    <error-component :errors="errors.confirmPassword" />
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
        @input="validatePassword"
        required>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        @input="validateConfirmPassword"
        required>
      <button
        class="u-btn u-btn-primary"
        type="submit"
        :disabled="(!(isValidUsername && isValidPassword && isValidConfirmPassword))
          || isLoading">
        {{ isLoading ? 'Signing Up...' : 'Sign Up' }}
      </button>
    </form>
  </div>
</template>

<script>
import config from '../config';
import ErrorComponent from '../components/Error.vue';

export default {
  name: 'sign-up',
  data: () => ({
    username: '',
    password: '',
    confirmPassword: '',
    isValidUsername: false,
    isValidPassword: false,
    isValidConfirmPassword: false,
    isLoading: false,
    errors: {
      username: [],
      password: [],
      confirmPassword: [],
      server: [],
    },
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
    validateConfirmPassword(e) {
      this.errors.confirmPassword = [];
      if (this.isValidPassword) {
        if (this.password.trim() !== this.confirmPassword.trim()) {
          this.isValidConfirmPassword = false;
          e.target.classList.add('invalid');
          this.errors.confirmPassword = ['Confirm password does not match with original password.'];
        } else {
          e.target.classList.remove('invalid');
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
        this.isLoading = true;
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
            this.isLoading = false;
            if (res.username) {
              localStorage.token = `Bearer ${res.authToken}`;
              this.$router.push({ name: 'dashboard' });
            } else {
              this.errors.server = res.message;
            }
          })
          .catch((err) => {
            this.isLoading = false;
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
