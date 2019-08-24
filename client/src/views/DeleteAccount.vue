<template>
  <div class="u_container">
    <h1>Are You Sure<span class="u-primary">?</span></h1>
    <p class="kicker">
      Do you really want to delete the account with Book<span class="u-primary u-bold">Mark</span>?
      You will lost all of your bookmarks if you continue from this page!
    </p>
    <div>
      <a href="#" class="u-btn u-long u-secondary-border" @click="goBack">No, Go Back!</a>
      <button
        class="u-btn u-long u-danger-border"
        @click="deleteAccount"
        :disabled="isLoading">
        {{ isLoading ? 'Deleting Account...' : 'Yes, I\'m Sure'}}
      </button>
    </div>
  </div>
</template>

<script>
import User from '../lib/User';

export default {
  name: 'delete-account',
  data: () => ({
    isLoading: false,
  }),
  methods: {
    goBack() {
      this.$router.back();
    },
    deleteAccount() {
      this.isLoading = true;
      User.deleteAccount()
        .then(() => this.$router.push({ name: 'accountDeleteConfirm' }))
        .catch((err) => {
          /* eslint-disable no-console */
          console.log(err);
          /* eslint-enable no-console */
        });
    },
  },
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
