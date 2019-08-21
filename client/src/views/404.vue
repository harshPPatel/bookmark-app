<template>
<div class="container">
    <h1>404 Error</h1>
    <h2>Page Not Found<span class="u-primary">!</span></h2>
    <p class="kicker">
      Sorry! There is some error to Book<span class="u-primary u-bold">Mark</span> server.<br>
      Are you logged In?<br>
    </p>
    <div>
      <a href="#" class="u-btn u-long u-secondary-border" @click="goBack">No, Go Back!</a>
      <router-link class="u-btn u-long u-primary-border" :to="{ name: 'home' }">
        Go to Home
      </router-link>
    </div>
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
    margin-top: 80px;
    margin-bottom: 24px;
  }

  h2 {
    font-size: 48px;
    margin-top: 0;
    margin-bottom: 32px;
  }

  .u-secondary-border {
    margin-right: 32px;
  }
}
</style>
