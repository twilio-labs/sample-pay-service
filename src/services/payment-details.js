'use strict';

const cfg = require('../config');
const voiceType = cfg.twimlVoiceType;
const INVALID_INPUT_MESSAGE =
  'I’m sorry, I didn’t get that. Can you please try again?';

const prompts = {
  /**
   * Prompts the user to enter credit card information to process the payment
   * @param {*} twiml The Twilio VoiceResponse instance created at the beginning of the call
   * @param {number} amount The amount to pay
   */
  createPayment: function(twiml, amount) {
    const pay = twiml.pay({
      chargeAmount: amount,
      maxAttempts: 3,
      minPostalCodeLength: 5,
      action: '/complete',
    });
    /* The order doesn't matter here. It will always be:
      1. credit card number
      2. expiration date
      3. zip code
      4. security number
    */
    this.creditCardPrompt(pay);
    this.expirationDatePrompt(pay);
    this.zipCodePrompt(pay);
    this.securityCodePrompt(pay);
  },

  creditCardPrompt: function(pay) {
    const cardNumberPrompt = pay.prompt({
      for: 'payment-card-number',
    });
    const say = cardNumberPrompt.say(voiceType, '');
    say.s('Please type in your credit card number.');

    const invalidCardNumberPrompt = pay.prompt({
      for: 'payment-card-number',
      errorType: 'invalid-card-number',
    });
    invalidCardNumberPrompt.say(
      voiceType,
      'Apologies, the credit card number you entered is incorrect. Please try again.'
    );
  },

  zipCodePrompt: function(pay) {
    const zipPrompt = pay.prompt({
      for: 'postal-code',
    });
    zipPrompt.say(voiceType, 'Please enter your zip code to continue.');

    const invalidZipPrompt = pay.prompt({
      for: 'postal-code',
      errorType: 'invalid-postal-code',
    });
    invalidZipPrompt.say(voiceType, INVALID_INPUT_MESSAGE);
  },

  expirationDatePrompt: function(pay) {
    const expirationDatePrompt = pay.prompt({
      for: 'expiration-date',
    });
    expirationDatePrompt.say(
      voiceType,
      'Please enter the expiration date. Two digits for the month and two digits for the year.'
    );

    const invalidExpirationDatePrompt = pay.prompt({
      for: 'expiration-date',
      errorType: 'invalid-date',
    });
    invalidExpirationDatePrompt.say(voiceType, INVALID_INPUT_MESSAGE);
  },

  securityCodePrompt: function(pay) {
    const securityCodePrompt = pay.prompt({
      for: 'security-code',
    });
    securityCodePrompt.say(
      voiceType,
      'Please enter the security code for your credit card. It’s the 3 digits located on the back of your card'
    );

    const invalidSecurityCodePrompt = pay.prompt({
      for: 'security-date',
      errorType: 'invalid-security-code',
    });
    invalidSecurityCodePrompt.say(voiceType, INVALID_INPUT_MESSAGE);
  },
};

module.exports = prompts;
