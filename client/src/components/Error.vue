<template>
  <div>
    <p
      class="error"
      v-for="(error, index) in errors"
      :key="index">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'error',
  props: ['errors'],
};
</script>

<style scoped lang="scss">
p {
  cursor: default;
  background-color: rgba(#FF3838, 0.20);
  padding: 16px 24px;
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
  color: darken(#FF3838, 15%);
  border-radius: 5px;
  margin-bottom: 24px;
  font-size: 16px;
  letter-spacing: 1px;
}
</style>
