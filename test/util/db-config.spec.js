'use strict';

const expect = require('chai').expect;
const {
  getData,
  setData,
  clearAndSetDefaults,
} = require('../../src/util/db-config');

describe('Util.db-config', function() {
  beforeEach('clean database', function() {
    clearAndSetDefaults();
  });

  describe('#getData()', function() {
    context('when there is no data in the database', function() {
      it('returns the default data', function(done) {
        const db = getData();
        expect(db).to.eql({
          company: 'Teldigo',
          detail: 'Dentist',
          amount: 20.5,
        });
        done();
      });
    });

    context('when there is data already in the database', function() {
      it('returns the existing data', function(done) {
        setData({
          company: 'MyCompany',
          detail: 'Detail1',
          amount: 5,
        });
        const db = getData();
        expect(db).to.eql({
          company: 'MyCompany',
          detail: 'Detail1',
          amount: 5,
        });
        done();
      });
    });
  });

  describe('#setData()', function() {
    it('overrides the default data on the database', function(done) {
      const defaultData = getData();
      expect(defaultData).to.eql({
        company: 'Teldigo',
        detail: 'Dentist',
        amount: 20.5,
      });
      setData({
        company: 'MyCompany',
        detail: 'Detail1',
        amount: 5,
      });
      const newData = getData();
      expect(newData).to.eql({
        company: 'MyCompany',
        detail: 'Detail1',
        amount: 5,
      });
      done();
    });
  });
});
