<template>
  <div class="u_container">
    <h1>Account deleted<span class="u-primary">!</span></h1>
    <p class="kicker">
      Your account and all data with Book<span class="u-primary u-bold">Mark</span> is deleted
      permanently.
      We wish we could able to fulfill your wishes.
    </p>
    <div>
      <router-link class="u-btn u-long u-secondary-border" :to="{ name: 'signup' }">
        Sign Up Again
      </router-link>
      <router-link class="u-btn u-long u-primary-border" :to="{ name: 'home' }">
        Go to Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped lang="scss">
.u_container {
  text-align: center;

  @media (max-width: 468px) {
    text-align: left;
  }

  .kicker {
    width: 40%;
    margin: 0 auto;
    color: #2E2E2E;
    margin-bottom: 40px;

    @media (max-width: 668px) {
      width: 100%;
    }
  }

  h1 {
    font-size: 48px;
    margin-top: 80px;

    @media (max-width: 468px) {
      font-size: 32px;
    }
  }

  .u-secondary-border {
    margin-right: 32px;

    @media (max-width: 468px) {
      margin-right: 0;
      margin-bottom: 16px;
    }
  }
}
</style>
