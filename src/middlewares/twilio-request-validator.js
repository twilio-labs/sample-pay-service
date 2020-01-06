'use strict';

const twilio = require('twilio');

/**
 * Since we are using `ngrok` to expose our `localhost` server to a public URL,
 * we need to let the `twilio.webhook()` validator know we want to use the protocol
 * from the forwarded URL that ngrok provides which is https.
 * Otherwise, the Twilio validator will use `req.protocol` which returns
 * the localhost protocol which is http and the validation will fail.
 *
 * This also applies when deploying to Heroku or other hosting service which uses proxy URLs.
 *
 * @return {*} The Twilio validation middleware
 */
module.exports = function validate(...args) {
  let opts = {
    validate: true,
  };

  // Process arguments
  for (let i = 0, l = args.length; i < l; i++) {
    const arg = args[i];
    opts = Object.assign({}, opts, arg);
  }

  return function hook(req, res, next) {
    const protocol = req.headers['x-forwarded-proto']
      ? req.headers['x-forwarded-proto']
      : req.protocol;
    opts = Object.assign({}, opts, { protocol });
    return twilio.webhook(opts)(req, res, next);
  };
};
