require('dotenv').config();
require('./db');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const middlewares = require('./middlewares');
const auth = require('./auth');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/auth', auth);
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
