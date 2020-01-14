'use strict';

const express = require('express');
const base = require('./base');
const payment = require('./payment');

const app = express();

app.use('/', base);
app.use('/', payment);

module.exports = app;
