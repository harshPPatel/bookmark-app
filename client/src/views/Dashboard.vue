<template>
  <div class="container">
    <h1>Your Bookmarks<span class="u-primary">.</span></h1>
    <p v-for="(error, index) in errors.server" :key="index">{{ error }}</p>
    <p v-for="(error, index) in errors.name" :key="index">{{ error }}</p>
    <p v-for="(error, index) in errors.url" :key="index">{{ error }}</p>
    <form @submit.prevent="submitForm">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        required
        @input="validateName"
        v-model="name">
      <input
        type="url"
        name="url"
        id="url"
        placeholder="URL"
        required
        @input="validateUrl"
        v-model="url">
      <button type="submit" :disabled="!(isValidName && isValidUrl)">Add Bookmark</button>
    </form>
    <p v-if="totalBookmarks === 0">No bookmarks found. Add Bookmarks to save them.</p>
    <div class="bookmarks_container">
      <p v-for="bookmark in bookmarks" :key="bookmark._id">
        {{ bookmark.name }}
      </p>
    </div>
  </div>
</template>

<script>
import config from '../config';

export default {
  name: 'dashboard',
  data: () => ({
    name: '',
    url: '',
    bookmarks: [],
    totalBookmarks: null,
    isValidName: false,
    isValidUrl: false,
    errors: {
      server: [],
      name: [],
      url: [],
    },
  }),
  created() {
    const API_URL = `${config.API_URL}/api/v1/bookmarks/all`;
    fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.token,
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (res.username) {
          this.totalBookmarks = res.total;
          this.bookmarks = res.bookmarks;
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
  methods: {
    validateName(e) {
      this.isValidName = false;
      this.errors.name = [];
      if (this.name.trim().length === 0) {
        e.target.classList.add('invalid');
        this.errors.name.push('Bookmark Name is required.');
      } else {
        e.target.classList.remove('invalid');
        this.isValidName = true;
      }
    },
    validateUrl(e) {
      const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
      this.errors.url = [];
      this.isValidUrl = false;

      if (this.url.trim().length === 0) {
        e.target.classList.add('invalid');
        this.errors.url.push('URL is required.');
      } else if (!this.url.match(urlRegex)) {
        e.target.classList.add('invalid');
        this.errors.url.push('Please enter valid URL.');
      } else {
        e.target.classList.remove('invalid');
        this.isValidUrl = true;
      }
    },
    submitForm(e) {
      if (this.isValidName && this.isValidUrl) {
        const bookmark = {
          name: this.name.trim(),
          url: this.url.trim(),
        };
        const API_URL = `${config.API_URL}/api/v1/bookmarks/add`;
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.token,
          },
          body: JSON.stringify({ ...bookmark }),
        })
          .then(res => res.json())
          .then((res) => {
            if (res.bookmark) {
              this.bookmarks.unshift(res.bookmark);
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
        this.name = '';
        this.url = '';
        e.target.name.focus();
      } else if (!this.isValidUrl) {
        e.target.url.focus();
      } else {
        e.target.name.focus();
      }
    },
  },
};
</script>

<style>

</style>
