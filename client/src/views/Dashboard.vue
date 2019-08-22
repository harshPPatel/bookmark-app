<template>
  <div class="u_container">
    <h1>Your Bookmarks<span class="u-primary">.</span></h1>
    <error-component :errors="errors.server" />
    <error-component :errors="errors.name" />
    <error-component :errors="errors.url" />
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
      <button
        type="submit"
        :disabled="(!(isValidName && isValidUrl)) || isLoading"
        class="u-btn u-btn-primary">
        {{ isLoading ? 'Sending...' : 'Add Bookmark' }}
      </button>
    </form>
    <p v-if="totalBookmarks === 0" class="no-bookmarks">No bookmarks found. Add Bookmarks now!</p>
    <div v-if="totalBookmarks !== 0" class="bookmarks_container">
      <p>
        Scroll to show options for bookmarks.
      </p>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Website</th>
            <th>Open</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <bookmark-row
            v-for="(bookmark, index) in bookmarks"
            :key="bookmark._id"
            :bookmark="bookmark"
            :index="index"
            v-on:filter-bookmarks="filterBookmarks"/>
        </tbody>
      </table>
    </div>
    <p>
      <router-link :to="{ name: 'deleteAccount' }" class="deleteLink">
        Want to Delete your Account?
      </router-link>
    </p>
  </div>
</template>

<script>
import config from '../config';
import BookmarkRow from '../components/BookmarkRow.vue';
import ErrorComponent from '../components/Error.vue';

export default {
  name: 'dashboard',
  data: () => ({
    name: '',
    url: '',
    bookmarks: [],
    totalBookmarks: 0,
    isValidName: false,
    isValidUrl: false,
    isLoading: false,
    errors: {
      server: [],
      name: [],
      url: [],
    },
  }),
  components: {
    BookmarkRow,
    ErrorComponent,
  },
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
    filterBookmarks(id) {
      /* eslint-disable no-underscore-dangle */
      this.bookmarks = this.bookmarks.filter(bookmark => (bookmark._id !== id));
      /* eslint-enable no-underscore-dangle */
    },
    submitForm(e) {
      if (this.isValidName && this.isValidUrl) {
        const bookmark = {
          name: this.name.trim(),
          url: this.url.trim(),
        };
        const API_URL = `${config.API_URL}/api/v1/bookmarks/add`;
        this.isLoading = true;
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
            this.isLoading = false;
            if (res.bookmark) {
              this.bookmarks.unshift(res.bookmark);
              this.totalBookmarks = this.totalBookmarks + 1;
            } else {
              this.errors.server.push(res.message);
            }
          })
          .catch((err) => {
            this.isLoading = false;
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

<style lang="scss" scoped>
h1 {
  font-size: 48px;
  margin-top: 20px;
  margin-bottom: 30px;

  @media (max-width: 568px) {
    font-size: 32px;
  }
}

.u_container {
  div:nth-of-type(1),
  div:nth-of-type(2),
  div:nth-of-type(3) {
    display: inline-block;
  }
}

.bookmarks_container p {
  display: none;
}

.no-bookmarks {
  font-size: 24px;
}

@media (max-width: 668px) {
  .bookmarks_container {
    overflow-x: scroll;

    table {
      min-width: 548px;
    }

    p {
      display: block;
      text-align: right;
    }
  }
}

form {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;

  @media (max-width: 668px) {
    flex-direction: column;
    margin-bottom: 24px;

    input,
    button.u-btn {
      margin-right: 0!important;
      width: 100%!important;
    }

    input {
      margin-bottom: 16px!important;
    }
  }

  input {
    max-width: initial;
    width: 40%;
    margin-right: 16px;
    margin-bottom: 0;
  }

  button {
    width: 20%!important;
    height: 42px;
    font-size: 16px;
    padding: 0 16px;
  }
}

table {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 3px 16px rgba(black, 0.25);
  border: none;
  border-collapse: collapse;
  overflow: auto;
  font-size: 18px;
  max-height: 600px;

  @media (max-width: 668px) {
    width: 100%;
    margin-bottom: 50px;
  }

  tr {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    border: none;
    cursor: default;

    th {
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

  th {
    font-weight: bold;
    background-color: #0C97FA;
    color: white;
  }

  tbody tr {
    &:not(:last-of-type) {
      border-bottom: 1px solid rgba(#707070, 0.4);
    }

    &:last-of-type {
      padding-bottom: 5px;
    }
  }
}

.deleteLink {
  position: absolute;
  bottom: 24px;
  right: 10%;
  color: #FF3838;
  font-weight: bold;
  font-style: italic;
  opacity: 0.75;
  transition: all 0.2s ease;

  @media (max-width: 668px) {
    position: static;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
