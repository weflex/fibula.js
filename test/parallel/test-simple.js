'use strict';
const assert = require('assert');
const fixtures = require('../../lib/index.js');

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
  if (db && db.close) {
    db.close();
  }
});

describe('case1', function () {
  beforeEach(function () {
    fixtures.use('case1');
  });
  it('test the documents', function (next) {
    db.collection('foo').find({}).toArray(function (err, docs) {
      assert.equal(docs.length, 2);
      assert.equal(docs[0].name, 'foo');
      assert.equal(docs[1].name, 'bar');
      next();
    });
  });
});

describe('case1 in before each', function () {
  beforeEach(function () {
    fixtures.use('case1');
  });
  it('test the documents', function (next) {
    db.collection('foo').find({}).toArray(function (err, docs) {
      assert.equal(docs.length, 2);
      assert.equal(docs[0].name, 'foo');
      assert.equal(docs[1].name, 'bar');
      next();
    });
  });
});

describe('js-file', function () {
  beforeEach(function () {
    fixtures.use('js-file');
  });
  it('test the foo.js', function (next) {
    db.collection('foo').find({}).toArray(function (err, docs) {
      assert.equal(docs.length, 1);
      assert.ok(docs[0].date instanceof Date);
      next();
    });
  });
});

describe('multi-files', function () {
  before(function () {
    fixtures.use('multi-files');
  });
  it('test the foo.json', function (next) {
    db.collection('foo').find({}).toArray(function (err, docs) {
      const expect = fixtures.get('foo');
      assert.equal(docs.length, 1);
      assert.ok(docs[0]._id);
      assert.equal(docs[0].bar, expect[0].bar);
      next();
    });
  });
  it('test the bar.json', function (next) {
    db.collection('bar').find({}).toArray(function (err, docs) {
      const expect = fixtures.get('bar');
      assert.equal(docs.length, 1);
      assert.ok(docs[0]._id);
      assert.equal(docs[0].bar, expect[0].bar);
      next();
    });
  });
});
