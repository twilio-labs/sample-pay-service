'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const prompts = require('../../src/services/payment-details');

chai.use(sinonChai);

describe('Services.payment-details', function() {
  describe('#createPayment', function() {
    it('prompts for payment details', function() {
      console.log('ENV', process.env.NODE_ENV);

      const twiml = new VoiceResponse();
      sinon.spy(prompts);
      prompts.createPayment(twiml, 50);
      const response = twiml.toString();
      expect(response).to.contain(
        '<Pay chargeAmount="50" maxAttempts="3" minPostalCodeLength="5" action="/complete">'
      );
      expect(prompts.creditCardPrompt).to.have.been.calledOnce;
      expect(prompts.expirationDatePrompt).to.have.been.calledOnce;
      expect(prompts.zipCodePrompt).to.have.been.calledOnce;
      expect(prompts.securityCodePrompt).to.have.been.calledOnce;

      sinon.restore();
    });
  });

  describe('#creditCardPrompt', function() {
    it('prompts for credit card number', function() {
      const twiml = new VoiceResponse();
      prompts.creditCardPrompt(twiml);
      const response = twiml.toString();
      expect(response).to.contain(
        '<Prompt for="payment-card-number"><Say voice="Polly.Joanna"><s>Please type in your credit card number.</s></Say></Prompt>' +
          '<Prompt for="payment-card-number" errorType="invalid-card-number"><Say voice="Polly.Joanna">Apologies, the credit card number you entered is incorrect. Please try again.</Say></Prompt>'
      );
    });
  });

  describe('#expirationDatePrompt', function() {
    it('prompts for credit card expiration date', function() {
      const twiml = new VoiceResponse();
      prompts.expirationDatePrompt(twiml);
      const response = twiml.toString();
      expect(response).to.contain(
        '<Prompt for="expiration-date"><Say voice="Polly.Joanna">Please enter the expiration date. Two digits for the month and two digits for the year.</Say></Prompt>' +
          '<Prompt for="expiration-date" errorType="invalid-date"><Say voice="Polly.Joanna">I’m sorry, I didn’t get that. Can you please try again?</Say></Prompt>'
      );
    });
  });

  describe('#zipCodePrompt', function() {
    it('prompts for a zip code', function() {
      const twiml = new VoiceResponse();
      prompts.zipCodePrompt(twiml);
      const response = twiml.toString();
      expect(response).to.contain(
        '<Prompt for="postal-code"><Say voice="Polly.Joanna">Please enter your zip code to continue.</Say></Prompt>' +
          '<Prompt for="postal-code" errorType="invalid-postal-code"><Say voice="Polly.Joanna">I’m sorry, I didn’t get that. Can you please try again?</Say></Prompt>'
      );
    });
  });

  describe('#securityCodePrompt', function() {
    it('prompts for a zip code', function() {
      const twiml = new VoiceResponse();
      prompts.securityCodePrompt(twiml);
      const response = twiml.toString();
      expect(response).to.contain(
        '<Prompt for="security-code"><Say voice="Polly.Joanna">Please enter the security code for your credit card. It’s the 3 digits located on the back of your card</Say></Prompt>' +
          '<Prompt for="security-date" errorType="invalid-security-code"><Say voice="Polly.Joanna">I’m sorry, I didn’t get that. Can you please try again?</Say></Prompt>'
      );
    });
  });
});
