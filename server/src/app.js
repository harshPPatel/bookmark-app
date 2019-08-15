const express = require('express');
const morgan = require('morgan');
// const middlewares = require('./middlewares');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! 😊',
  });
});

module.exports = app;
