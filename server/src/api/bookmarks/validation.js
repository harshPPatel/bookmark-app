const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

// Validating Bookmark
const validateBookmark = (bookmark) => {
  const { name, url } = bookmark;
  const result = {
    isValid: true,
    error: [],
  };

  if (!name || name.trim().length === 0) {
    result.isValid = false;
    result.error.push('Bookmark Name is required.');
  }
  if (!url || url.trim().length === 0) {
    result.isValid = false;
    result.error.push('URL is required.');
  }
  if (!url.match(urlRegex)) {
    result.isValid = false;
    result.error.push('Please enter valid URL.');
  }

  return result;
};

module.exports = validateBookmark;
