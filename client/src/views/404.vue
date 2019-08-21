<template>
  <div class="container">
    <h1>404 Page</h1>
    <a href="#" @click.prevent="goBack">Go Back</a>
    <router-link :to="{ name: 'home' }">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'page-not-found',
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style>

</style>
