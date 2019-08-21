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

.u-bold {
  font-weight: 700;
}

.u_container {
  max-width: 1240px;
  width: 98%;
  margin: 0 auto;
}

h1 {
  font-weight: 800;
  color: #2E2E2E;
  font-size: 61px;
}

.u-btn {
  display: inline-block;
  min-width: 125px;
  text-decoration: none;
  padding: 10px 24px;
  font-weight: 700;
  opacity: 1;
  transition: all 0.2s ease;
  border-radius: 5px;

  &:hover,
  &:active {
    opacity: 0.85;
  }

  &.u-btn-primary {
    background-color: #0C97FA;
    background: linear-gradient(to right, #0C97FA, #16E1F5);
    color: white;
  }
}
</style>
