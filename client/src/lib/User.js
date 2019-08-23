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

const login = async (user) => {
  let promise;
  const API_URL = `${config.API_URL}/auth/login`;
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...user }),
  })
    .then(res => res.json())
    .then((data) => {
      promise = new Promise((resolve, reject) => {
        if (data.username) {
          localStorage.token = `Bearer ${data.authToken}`;
          resolve();
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

const signup = async (user) => {
  let promise;
  const API_URL = `${config.API_URL}/auth/signup`;
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...user }),
  })
    .then(res => res.json())
    .then((data) => {
      promise = new Promise((resolve, reject) => {
        if (data.username) {
          localStorage.token = `Bearer ${data.authToken}`;
          resolve();
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

const verify = async () => {
  let promise;
  const API_URL = `${config.API_URL}/auth/verify`;
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.token,
    },
  })
    .then(res => res.json())
    .then((response) => {
      promise = new Promise((resolve, reject) => {
        if (response.isUserValid) {
          resolve();
        } else {
          localStorage.removeItem('token');
          reject();
        }
      });
    })
    .catch((err) => {
      pushToErrorPage(err);
    });
  return promise;
};

export default {
  login,
  signup,
  verify,
};
