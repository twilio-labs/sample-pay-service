'use strict';

const expect = require('chai').expect;
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const completePayment = require('../../src/services/complete-payment');

describe('Services.complete-payment', function() {
  describe('#completePayment', function() {
    context('when payment is successful', function() {
      it('responds with a success message', function() {
        const twiml = new VoiceResponse();
        completePayment('success', twiml, null);
        const response = twiml.toString();
        const message =
          '<Say voice="Polly.Joanna"><emphasis level="moderate">Your payment has been processed successfully! Have a great day!</emphasis></Say>';

        expect(response).to.contain(message);
      });
    });

    context('when Stripe rejects the payment', function() {
      it('responds with a rejection message', function() {
        const twiml = new VoiceResponse();
        completePayment(
          'payment-connector-error',
          twiml,
          'Invalid card number'
        );
        const response = twiml.toString();
        const message =
          '<Say voice="Polly.Joanna"/><Say voice="Polly.Joanna">Invalid card number</Say>';

        expect(response).to.contain(message);
      });
    });

    context(
      'when the user fails 3 times to enter a specific information',
      function() {
        it('responds with a rejection message', function() {
          const twiml = new VoiceResponse();
          completePayment('too-many-failed-attempts', twiml, null);
          const response = twiml.toString();
          const message =
            '<Say voice="Polly.Joanna"/><Say voice="Polly.Joanna">Sorry, there were too many failed attempts, please call again. Bye!</Say>';

          expect(response).to.contain(message);
        });
      }
    );

    context('when an unexpected error occurs', function() {
      it('responds with a rejection message', function() {
        const twiml = new VoiceResponse();
        completePayment('unexpected-error', twiml, null);
        const response = twiml.toString();
        const message =
          '<Say voice="Polly.Joanna"><emphasis level="moderate">The payment was not completed successfully</emphasis></Say>';

        expect(response).to.contain(message);
      });
    });
  });
});
