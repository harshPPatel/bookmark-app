<template>
  <div class="u_container">
    <h1>Sign Up<span class="u-primary">.</span></h1>
    <!-- Errors -->
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
import ValidateUser from '../lib/validation/User';
import User from '../lib/User';
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
    // validating the username
    validateUsername(e) {
      this.errors.username = [];
      this.isValidUsername = false;
      ValidateUser.username(this.username)
        .then(() => {
          e.target.classList.remove('invalid');
          this.isValidUsername = true;
        })
        .catch((err) => {
          e.target.classList.add('invalid');
          this.errors.username = err;
        });
    },
    // validating the password
    validatePassword(e) {
      this.errors.password = [];
      this.isValidPassword = false;

      ValidateUser.password(this.password)
        .then(() => {
          e.target.classList.remove('invalid');
          this.isValidPassword = true;
        })
        .catch((err) => {
          e.target.classList.add('invalid');
          this.errors.password = err;
        });
    },
    // validating the confirm password
    validateConfirmPassword(e) {
      this.errors.confirmPassword = [];
      if (this.isValidPassword) {
        if (this.password.trim() !== this.confirmPassword.trim()) {
          this.isValidConfirmPassword = false;
          e.target.classList.add('invalid');
          this.errors.confirmPassword.push('Passwords does not match!');
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

        // Signing up the user
        User.signup(user)
          .then(() => {
            this.isLoading = false;
            this.$router.push({ name: 'dashboard' });
          })
          .catch((err) => {
            this.isLoading = false;
            this.errors.server = err.message;
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
