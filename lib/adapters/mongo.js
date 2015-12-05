'use strict';

const typifyJSON = require('typify-json');
const exec = require('child_process').execSync;
const dbname = process.env.FIXTURES_MONGO_DBNAME || 'test';
const collections = [];

exports.del = function () {
  exec(`mongo localhost:27017/${dbname} --eval "db.dropDatabase()"`);
};

exports.put = function (collection, documents) {
  const serialized = typifyJSON.stringify(documents).replace(/"/g, '\\"');
  exec(`mongo localhost:27017/${dbname} --eval "db.${collection}.insert(${serialized})"`);
};
