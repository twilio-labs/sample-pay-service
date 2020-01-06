'use strict';

if (!process.env.CI && process.env.NODE_ENV !== 'test') {
  require('dotenv-safe').config();
}

const cfg = {};

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
//
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || '1234567890abc';

// The Twiml voice type to use:
// https://www.twilio.com/docs/voice/twiml/say/text-speech
//
// In this case, we are using the Amazon Polly provider which lets you fine tune
// several options like pitch, tempo and volume of the voice prompts.
cfg.twimlVoiceType = { voice: 'Polly.Joanna' };

// Export configuration object
module.exports = cfg;
