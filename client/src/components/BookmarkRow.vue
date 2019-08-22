<template>
  <tr>
    <td>{{ index + 1 }}</td>
      <td>{{ bookmark.name }}</td>
      <td>
        <a :href="bookmark.url" target="_blank" class="u-btn u-small u-btn-primary">Open</a>
      </td>
      <td>
        <a href="#"
          @click.prevent="deleteBookmark(bookmark._id)"
          class="u-btn u-small u-danger-border">
          Delete
        </a>
      </td>
  </tr>
</template>

<script>
import config from '../config';

export default {
  name: 'bookmark-row',
  props: ['bookmark', 'index'],
  methods: {
    deleteBookmark(_id) {
      const API_URL = `${config.API_URL}/api/v1/bookmarks/${_id}`;
      fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token,
        },
      })
        .then(res => res.json())
        .then((res) => {
          if (res.message) {
            /* eslint-disable no-underscore-dangle */
            this.bookmarks = this.bookmarks.filter(bookmark => (bookmark._id !== _id));
            /* eslint-enable no-underscore-dangle */
            this.totalBookmarks = this.totalBookmarks - 1;
          } else {
            this.errors.server.push(res.message);
          }
        })
        .catch((err) => {
          this.$router.push({
            name: 'error',
            params: {
              errorCode: err.error,
              errorMessage: err.message,
            },
          });
        });
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
