const db = require('mongoose');

const URI = `mongodb+srv://admin:${process.env.DATABASE_PASSWORD}@node-database-ws1nv.mongodb.net/test?retryWrites=true&w=majority`;

db.connect(URI, {useNewUrlParser: true})
  .then(() => console.log('database connected'))
  .catch((err) => console.error(err));

module.exports = db;
