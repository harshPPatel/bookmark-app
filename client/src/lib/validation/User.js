// validating the user's username
const username = (name) => {
  const usernameLength = name.trim().length;
  const errors = [];
  let isValid = false;

  if (usernameLength === 0) {
    errors.push('Username is required');
  } else if (usernameLength < 2) {
    errors.push('Username should have atleast two characters!');
  } else if (usernameLength > 30) {
    errors.push('Username should not be greatere than 30 characters!');
  } else if (!name.trim().match(/(^[a-zA-Z0-9_]+$)/)) {
    errors.push('Username can only have numbers, alphabets and underscores.');
  } else {
    isValid = true;
  }

  return new Promise((resolve, reject) => {
    if (isValid) resolve();
    else reject(errors);
  });
};

// Validation user's password
const password = (userPassword) => {
  const errors = [];
  let isValid = false;

  if (userPassword.trim().length === 0) {
    errors.push('Password is required');
  } else if (userPassword.trim().length < 6) {
    errors.push('Password should atleast have 6 characters');
  } else {
    isValid = true;
  }

  return new Promise((resolve, reject) => {
    if (isValid) resolve();
    else reject(errors);
  });
};

export default {
  username,
  password,
};
