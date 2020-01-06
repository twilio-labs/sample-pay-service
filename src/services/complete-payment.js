'use strict';

const cfg = require('../config');
const voiceType = cfg.twimlVoiceType;
/**
 * Says to the user the result of the transaction, successful or unsuccessful
 * @param {string} result Result message of the transaction
 * @param {*} twiml The Twilio VoiceResponse instance created at the beginning of the call
 * @param {*} errorMessage Detailed error message in case the result wasn't successful, `null` otherwise
 */
function completePayment(result, twiml, errorMessage) {
  const say = twiml.say(voiceType, '');
  switch (result) {
    case 'success':
      say.emphasis(
        { level: 'moderate' },
        'Your payment has been processed successfully! Have a great day!'
      );
      break;

    case 'payment-connector-error':
      twiml.say(voiceType, errorMessage);
      break;

    case 'too-many-failed-attempts':
      twiml.say(
        voiceType,
        'Sorry, there were too many failed attempts, please call again. Bye!'
      );
      break;

    default:
      say.emphasis(
        { level: 'moderate' },
        'The payment was not completed successfully'
      );
      break;
  }
}

module.exports = completePayment;
