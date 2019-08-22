require('dotenv').config();
require('./db');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const middlewares = require('./middlewares');
const auth = require('./auth');
const api = require('./api');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Auth End Point
app.use('/auth', auth);

// API End Point
app.use('/api/v1', api);

// Error Handlers
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
