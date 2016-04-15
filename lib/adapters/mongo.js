"use strict"

const typifyJSON = require('typify-json');
const exec = require('child_process').execSync;
const host = process.env.FIXTURES_MONGO_HOST || '127.0.0.1';
const port = process.env.FIXTURES_MONGO_PORT || 27017;
const dbname = process.env.FIXTURES_MONGO_DBNAME || 'test';
const collections = [];

var dburl = `${host}:${port}/${dbname}`;
var dbAsyncConn;

if (process.env.FIXTURES_MONGO_URI) {
  dburl = process.env.FIXTURES_MONGO_URI;
}

function createConnection (cb) {
  if (dbAsyncConn) {
    return cb(null, dbAsyncConn);
  }
  const MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(`mongodb://${dburl}`, function (err, db) {
    if (err) return cb(err);
    dbAsyncConn = db;
    return cb(null, dbAsyncConn);
  });
}

function handleError (err, cb) {
  if (dbAsyncConn) {
    dbAsyncConn.close();
    dbAsyncConn = undefined;
  }
  if (err) {
    console.error(err && err.stack);
  }
  cb(err);
}

exports.put = function (coll, docs, cb) {
  if (typeof cb !== 'function') {
    const serialized = typifyJSON.stringify(docs)
      .replace(/"/g, '\\"').replace(/\$/g, '\\$');
    exec(`mongo ${dburl} --eval "db.${coll}.insert(${serialized})"`);
  } else {
    createConnection(function (err, db) {
      if (err) return handleError(err, cb);
      db.collection(coll).insertMany(docs, null, cb);
    });
  }
};

exports.del = function (cb) {
  if (typeof cb !== 'function') {
    exec(`mongo ${dburl} --eval "db.dropDatabase()"`);
  } else {
    createConnection(function (err, db) {
      if (err) return handleError(err);
      db.dropDatabase(cb);
    });
  }
};

exports.close = function (cb) {
  createConnection(function (err) {
    if (err) return cb(err);
    dbAsyncConn.close(cb);
    dbAsyncConn = undefined;
  });
};
