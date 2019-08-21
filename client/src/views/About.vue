<template>
  <div class="u_container">
    <div class="svg_container">
      <Logo />
    </div>
    <h2>Free BookMark App for YOU<span class="u-primary">!</span></h2>
    <p class="kicker">
      Sign Up with your email and create your account to
      Book<span class="u-primary u-bold">Mark</span>
      and start adding your bookmarks and get them anytime you want.
      So stop remembering blog's title, just add the URL with name for ease access.<br />
      Book<span class="u-primary u-bold">Mark</span> is free for life
      so do not worry about pricing!<br />
      <span class="u-bold">Sign Up Now!</span>
    </p>
    <div class="link_container">
      <router-link class="u-btn u-long u-secondary-border" :to="{ name: 'home' }">Go to Home</router-link>
      <router-link class="u-btn u-long u-primary-border" :to="{ name: 'signup' }">Sign Up Now!</router-link>
    </div>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue';

export default {
  name: 'about',
  components: { Logo },
};
</script>

<style lang="scss" scoped>
.u_container {
  text-align: center;
  margin-top: 100px;

  .svg_container {
    height: 64px;
    width: auto;
    margin-bottom: 50px;

    svg {
      height: 100%;
      width: auto;
    }
  }

  .u-secondary-border {
    margin-right: 32px;
  }

  .kicker {
    max-width: 575px;
    margin: 0 auto;
    color: rgba(#2E2E2E, 0.75);
    margin-bottom: 32px;
  }
}
</style>
