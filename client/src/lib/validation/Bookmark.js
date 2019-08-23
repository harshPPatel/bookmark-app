const name = (bookmarkName) => {
  let isValid = false;
  const errors = [];

  if (bookmarkName.trim().length === 0) {
    errors.push('Bookmark Name is required.');
  } else {
    isValid = true;
  }

  return new Promise((resolve, reject) => {
    if (isValid) resolve();
    else reject(errors);
  });
};

const url = (bookmarkUrl) => {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
  let isValid = false;
  const errors = [];

  if (bookmarkUrl.trim().length === 0) {
    errors.push('URL is required.');
  } else if (!bookmarkUrl.match(urlRegex)) {
    errors.push('Please enter valid URL.');
  } else {
    isValid = true;
  }

  return new Promise((resolve, reject) => {
    if (isValid) resolve();
    else reject(errors);
  });
};

export default {
  name,
  url,
};
