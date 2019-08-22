const db = require('mongoose');

// URI for Database
const URI = `mongodb+srv://admin:${process.env.DATABASE_PASSWORD}@node-database-ws1nv.mongodb.net/test?retryWrites=true&w=majority`;

/* eslint-disable no-console */
db.connect(URI, { useNewUrlParser: true })
  .then(() => {
    // Logging confirm message
    console.log('Database Connected');
  })
  .catch((err) => {
    // Logging Connection Error
    console.error(err);
  });
/* eslint-disable no-console */

module.exports = db;
