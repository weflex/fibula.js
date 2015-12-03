'use strict';

const exec = require('child_process').execSync;
const dbname = process.env.FIXTURES_MONGO_DBNAME || 'test';

exports.clear = function () {
  exec(`mongo localhost:27017/${dbname} --eval "db.dropDatabase()"`);
};

exports.insert = function (collection, documents) {
  const serialized = JSON.stringify(documents).replace(/"/g, '\\"');
  exec(`mongo localhost:27017/${dbname} --eval "db.${collection}.insert(${serialized})"`);
};
