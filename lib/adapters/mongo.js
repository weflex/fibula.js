'use strict';

const typifyJSON = require('typify-json');
const exec = require('child_process').execSync;
const host = process.env.FIXTURES_MONGO_HOST || '127.0.0.1';
const port = process.env.FIXTURES_MONGO_PORT || 27017;
const dbname = process.env.FIXTURES_MONGO_DBNAME || 'test';
const collections = [];

exports.del = function () {
  exec(`mongo ${host}:${port}/${dbname} --eval "db.dropDatabase()"`);
};

exports.put = function (collection, documents) {
  const serialized = typifyJSON.stringify(documents).replace(/"/g, '\\"').replace(/\$/g, '\\$');
  exec(`mongo ${host}:${port}/${dbname} --eval "db.${collection}.insert(${serialized})"`);
};
