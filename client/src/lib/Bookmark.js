import Vue from 'vue';
import config from '../config';

// Funciton to push vue router to error page
const pushToErrorPage = (error) => {
  Vue.$router.push({
    name: 'error',
    params: {
      errorCode: error.error,
      errorMessage: error.message,
    },
  });
};

// Gets all bookmarks
const getAll = async () => {
  const API_URL = `${config.API_URL}/api/v1/bookmarks/all`;
  let promise;
  await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.token,
    },
  })
    .then(res => res.json())
    .then((data) => {
      promise = new Promise((resolve, reject) => {
        if (data.username) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    })
    .catch((err) => {
      pushToErrorPage(err);
    });

  return promise;
};

// Adds new bookmark
const add = async (bookmark) => {
  let promise;
  const API_URL = `${config.API_URL}/api/v1/bookmarks/add`;
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.token,
    },
    body: JSON.stringify({ ...bookmark }),
  })
    .then(res => res.json())
    .then((data) => {
      promise = new Promise((resolve, reject) => {
        if (data.bookmark) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    })
    .catch((err) => {
      pushToErrorPage(err);
    });

  return promise;
};

// Deleting bookmark
const del = async (id) => {
  let promise;
  const API_URL = `${config.API_URL}/api/v1/bookmarks/${id}`;
  await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.token,
    },
  })
    .then(res => res.json())
    .then((data) => {
      promise = new Promise((resolve, reject) => {
        if (data.message) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    })
    .catch((err) => {
      pushToErrorPage(err);
    });

  return promise;
};

// Exporting All methods
export default {
  getAll,
  add,
  del,
};
