'use strict';

const cfg = require('../config');
const voiceType = cfg.twimlVoiceType;

/**
 * Prompts the user the bill details to pay.
 * @param {string} phoneNumber The caller's phone number
 * @param {*} twiml The VoiceResponse instance created at the beginning of the call.
 * @param {*} bill An object which contains a company, bill detail and amount to pay
 */
function sayBillDetails(phoneNumber, twiml, bill) {
  const say = twiml.say(
    voiceType,
    `Thanks for calling [${bill.company}] to pay your`
  );
  say.emphasis(
    {
      level: 'moderate',
    },
    `[${bill.detail} bill] for [${bill.amount} dollars]`
  );
  say.s('Tied to the phone number,');
  say.sayAs(
    {
      'interpret-as': 'telephone',
    },
    // remove the first 2 characters since the phone number starts with +1
    phoneNumber.slice(2)
  );
}

module.exports = sayBillDetails;
