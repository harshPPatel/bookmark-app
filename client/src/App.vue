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

h1, h2 {
  font-weight: 800;
  color: #2E2E2E;
  font-size: 61px;
}

h1 {
  font-size: 61px;
}

h2 {
  font-size: 32px;
}

.u-btn {
  border: none;
  outline: none;
  cursor: pointer;
  display: inline-block;
  min-width: 125px;
  text-decoration: none;
  padding: 8px 24px;
  font-weight: 700!important;
  opacity: 1;
  transition: all 0.2s ease;
  border-radius: 5px;
  box-sizing: border-box;

  &:hover,
  &:active {
    opacity: 0.85;
  }

  &.u-btn-primary {
    background-color: #0C97FA;
    background: linear-gradient(to right, #0C97FA, #16E1F5);
    color: white;
  }

  &.u-secondary-border {
    background-color: #fff;
    border: 4px solid rgba(#2E2E2E, 0.65);
    color: rgba(#2E2E2E, 0.65);
  }

  &.u-primary-border {
    background-color: #fff;
    border: 4px solid #0C97FA;
    color: #0C97FA;
  }

  &.u-long {
    min-width: 200px;
    padding: 8px 24px;
  }
}

input {
  max-width: 350px;
  width: 100%;
  height: 42px;
  border: 2px solid #2E2E2E;
  border-radius: 5px;
  padding: 0 16px;
  font-size: 16px;
  letter-spacing: 1px;
  outline: none;
  box-shadow: none;
  transition: all 0.2s ease;

  &.invalid {
    border-color: #FF3838;
  }

  &:focus {
    box-shadow: 0 3px 16px rgba(black, 0.16);
  }

  &::placeholder {
    color: rgba(#2E2E2E, 0.75);
  }
}

.error {
  cursor: default;
  background-color: rgba(#FF3838, 0.20);
  padding: 16px 24px;
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
  color: darken(#FF3838, 15%);
  border-radius: 5px;
  margin-bottom: 24px;
}
</style>
