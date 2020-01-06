'use strict';

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Memory = require('lowdb/adapters/Memory');
const path = require('path');

const db = low(
  process.env.NODE_ENV === 'test'
    ? new Memory()
    : new FileSync(path.join(__dirname, '../../_data/db.json'))
);

setDefaults();

/**
 * Returns the the bill data stored on the JSON database
 * @return {*} The bill object from the JSON database
 */
function getData() {
  return db.get('bill').value();
}

/**
 * Saves the bill details on the database
 * @param {*} bill The bill object to save on the database
 */
function setData(bill) {
  db.set('bill', bill).write();
}

/**
 * Clears the database and sets the default values. Only used for testing.
 */
function clearAndSetDefaults() {
  db.unset('bill').write();
  setDefaults();
}

/**
 * Sets the database default values in case there is no data
 */
function setDefaults() {
  db.defaults({
    bill: {
      company: 'Teldigo',
      detail: 'Dentist',
      amount: 20.5,
    },
  }).write();
}

module.exports = { getData, setData, clearAndSetDefaults };
