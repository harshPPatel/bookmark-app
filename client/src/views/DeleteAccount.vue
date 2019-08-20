<template>
  <div class="container">
    <h1>Delete Account</h1>
    <a href="#" @click="goBack">No, Go Back!</a>
    <a href="#" @click="deleteAccount">Yes, I'm Sure</a>
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

<style>

</style>
