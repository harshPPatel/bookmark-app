require('dotenv').config();
require('./db');

const express = require('express');
const morgan = require('morgan');
const middlewares = require('./middlewares');
const auth = require('./auth');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', auth);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
