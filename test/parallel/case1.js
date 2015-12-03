
const assert = require('assert');
const fixtures = require('../../lib/index.js');
fixtures.use('case1');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/test';
var db;

before(function (next) {
  MongoClient.connect(url, function (err, _db) {
    db = _db;
    next();
  });
});

after(function () {
  db.close();
});

describe('case1', function () {
  it('test the documents', function (next) {
    db.collection('foo').find({}).toArray(function (err, docs) {
      assert.equal(docs.length, 2);
      assert.equal(docs[0].name, 'foo');
      assert.equal(docs[1].name, 'bar');
      next();
    });
  });
});