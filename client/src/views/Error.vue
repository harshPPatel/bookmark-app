<template>
  <div class="container">
    <h1>{{ $route.params.errorCode }} Error</h1>
    <p>{{ $route.params.errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'error',
};
</script>

<style>

</style>
