'use strict';

const expect = require('chai').expect;
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const sayBillDetails = require('../../src/services/bill-details');

describe('Services.bill-details', function() {
  describe('#sayBillDetails', function() {
    const bill = {
      company: 'TestCompany',
      detail: 'cleaning service',
      amount: '20.80',
    };
    it('responds a message of the bill details to pay', function() {
      const twiml = new VoiceResponse();
      sayBillDetails('+1111', twiml, bill);
      const response = twiml.toString();
      const message =
        'Thanks for calling [TestCompany] to pay your' +
        '<emphasis level="moderate">[cleaning service bill] for [20.80 dollars]</emphasis>' +
        '<s>Tied to the phone number,</s><say-as interpret-as="telephone">111</say-as>';

      expect(response).to.contain(message);
    });
  });
});
