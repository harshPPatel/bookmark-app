<template>
  <tr>
    <td>{{ index + 1 }}</td>
      <td>{{ bookmark.name }}</td>
      <td>
        <a :href="bookmark.url" target="_blank" class="u-btn u-small u-btn-primary">Open</a>
      </td>
      <td>
        <button
          @click.prevent="deleteBookmark(bookmark._id)"
          class="u-btn u-small u-danger-border"
          :disabled="isLoading">
          {{ isLoading ? 'Deleting' : 'Delete' }}
        </button>
      </td>
  </tr>
</template>

<script>
import Bookmark from '../lib/Bookmark';

export default {
  name: 'bookmark-row',
  props: ['bookmark', 'index'],
  data: () => ({
    isLoading: false,
  }),
  methods: {
    // Delete Bookmark
    deleteBookmark(_id) {
      this.isLoading = true;

      // Deelting the clicked bookmark from the server
      Bookmark.del(_id)
        .then(() => {
          /* eslint-disable no-underscore-dangle */
          this.$emit('filter-bookmarks', this.bookmark._id);
          /* eslint-enable no-underscore-dangle */
        })
        .catch((err) => {
          this.errors.server.push(err.message);
        });
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="scss">
tr {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: none;
  cursor: default;

  td {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-of-type {
      width: 10%;
    }
    &:nth-of-type(2) {
      width: 50%;
      justify-content: flex-start;
      padding-left: 16px;
    }
    &:nth-of-type(3),
    &:nth-of-type(4) {
      width: 20%;
    }
  }
}

tr {

  &:hover {
    background-color: #F1F1F1;
  }
}
</style>
