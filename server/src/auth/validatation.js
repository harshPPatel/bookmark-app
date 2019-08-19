const validateUser = (user) => {
  const { username, password } = user;
  const result = {
    isValid: true,
    error: [],
  };

  if (!username) {
    result.isValid = false;
    result.error.push('Username is required.');
  }
  if (!password) {
    result.isValid = false;
    result.error.push('Password is required.');
  }
  if (username.trim().length < 2) {
    result.isValid = false;
    result.error.push('Username length should not be less than 2.');
  }
  if (username.trim().length > 30) {
    result.isValid = false;
    result.error.push('Username length should not be greater than 30.');
  }
  if (!username.match(/(^[a-zA-Z0-9_]+$)/)) {
    result.isValid = false;
    result.error.push('Please enter valid username.');
  }
  if (password.trim().lenght < 6) {
    result.isValid = false;
    result.error.push('Password must have atleast 6 characters.');
  }

  return result;
};

module.exports = validateUser;
