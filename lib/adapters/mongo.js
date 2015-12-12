'use strict';

const typifyJSON = require('typify-json');
const exec = require('child_process').execSync;
const host = process.env.FIXTURES_MONGO_HOST || '127.0.0.1';
const port = process.env.FIXTURES_MONGO_PORT || 27017;
const dbname = process.env.FIXTURES_MONGO_DBNAME || 'test';
const collections = [];

var dburl = `${host}:${port}/${dbname}`;
if (process.env.FIXTURES_MONGO_URI) {
  dburl = process.env.FIXTURES_MONGO_URI;
}

exports.del = function () {
  exec(`mongo ${dburl} --eval "db.dropDatabase()"`);
};

exports.put = function (collection, documents) {
  const serialized = typifyJSON.stringify(documents).replace(/"/g, '\\"').replace(/\$/g, '\\$');
  exec(`mongo ${dburl} --eval "db.${collection}.insert(${serialized})"`);
};
