'use strict';

const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../../server');
const agent = supertest(app);

describe('Base routes', function() {
  describe('GET /', function() {
    it('returns index.html', function(done) {
      agent
        .get('/')
        .expect(function(response) {
          expect(response.text).to.contain('Payment over the phone');
          expect(response.text).to.contain('Sample pay service app');
        })
        .expect(200, done);
    });
  });

  describe('GET /config', function() {
    it('returns a form to configure the payment', function(done) {
      const formRegex = new RegExp(
        '<form action="/config" method="POST">' +
          '<div class="form-group"><label for="inputCompany"></label>Company name<input class="form-control" id="inputCompany" type="text" name="company" .*></div>' +
          '<div class="form-group"><label for="inputBill"></label>Bill to pay<input class="form-control" id="inputBill" type="text" name="detail" .*></div>' +
          '<div class="form-group"><label for="inputAmount"></label>Amount<input class="form-control" id="inputAmount" type="text" name="amount" .*></div>' +
          '<button class="btn btn-primary" type="submit">Submit</button></form>'
      );
      agent
        .get('/config')
        .expect(function(response) {
          expect(response.text).to.match(formRegex);
        })
        .expect(200, done);
    });
  });
});
