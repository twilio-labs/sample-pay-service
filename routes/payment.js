'use strict';

const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const prompts = require('../src/services/payment-details');
const sayBillDetails = require('../src/services/bill-details');
const completePayment = require('../src/services/complete-payment');
const validate = require('../src/middlewares/twilio-request-validator');
const { getData } = require('../src/util/db-config');

// Don't validate the Twilio request when running tests
const shouldValidate = process.env.NODE_ENV !== 'test';

/* eslint-disable new-cap */
const router = express.Router();

router.post('/pay', validate({ validate: shouldValidate }), (req, res) => {
  const twiml = new VoiceResponse();
  const phoneNumber = req.body.From;
  const data = getData();
  sayBillDetails(phoneNumber, twiml, data);
  prompts.createPayment(twiml, data.amount);
  res.type('text/xml');
  res.send(twiml.toString());
});

router.post('/complete', validate({ validate: false }), function(req, res) {
  const twiml = new VoiceResponse();
  completePayment(req.body.Result, twiml, req.body.PaymentError);
  twiml.hangup();
  res.type('text/xml');
  res.send(twiml.toString());
});

module.exports = router;
