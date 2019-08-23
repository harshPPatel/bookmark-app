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
import ValidateUser from '../lib/validation/User';
import User from '../lib/User';
import ErrorComponent from '../components/Error.vue';

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
