'use strict';

const express = require('express');
/* eslint-disable new-cap */
const router = express.Router();

const { getData, setData } = require('../src/util/db-config');

// GET: /appointments
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sample pay service app' });
});

// GET: /config
router.get('/config', function(req, res, next) {
  const config = getData();
  res.render('payment-config', { config });
});

// POST: /config
router.post('/config', function(req, res, next) {
  const data = {
    company: req.body.company,
    detail: req.body.detail,
    amount: req.body.amount,
  };
  setData(data);
  const config = getData();
  res.render('payment-config', { config, message: 'success' });
});

module.exports = router;
