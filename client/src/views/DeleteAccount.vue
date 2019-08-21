<template>
  <div class="container">
    <h1>Are You Sure<span class="u-primary">?</span></h1>
    <p class="kicker">
      Do you really want to delete the account with Book<span class="u-primary u-bold">Mark</span>?
      You will lost all of your bookmarks if you continue from this page!
    </p>
    <div>
      <a href="#" class="u-btn u-long u-secondary-border" @click="goBack">No, Go Back!</a>
      <a href="#" class="u-btn u-long u-danger-border" @click="deleteAccount">Yes, I'm Sure</a>
    </div>
  </div>
</template>

<script>
import config from '../config';

export default {
  name: 'delete-account',
  methods: {
    goBack() {
      this.$router.back();
    },
    deleteAccount() {
      const API_URL = `${config.API_URL}/auth/delete`;
      fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token,
        },
      })
        .then(res => res.json())
        .then((res) => {
          if (res.message) {
            localStorage.removeItem('token');
            this.$router.push({ name: 'accountDeleteConfirm' });
          } else {
            this.errors.server.push(res.message);
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
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  text-align: center;

  .kicker {
    width: 40%;
    margin: 0 auto;
    color: #2E2E2E;
    margin-bottom: 40px;
  }

  h1 {
    font-size: 48px;
    margin-top: 80px;
  }

  .u-secondary-border {
    margin-right: 32px;
  }
}
</style>
