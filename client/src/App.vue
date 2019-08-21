<template>
  <div id="app">
    <navbar />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import Navbar from './layout/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
$primary-color: #0C97FA;

* {
  box-sizing: border-box;
}

#app {
  font-family: 'Muli', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.u-primary {
  color: $primary-color;
}

.u_container {
  max-width: 1240px;
  width: 98%;
  margin: 0 auto;
}
</style>
