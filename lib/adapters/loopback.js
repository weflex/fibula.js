'use strict'

const collections = [];
let context = null;

exports.setContext = function (val) {
  context = val;
};

exports.put = function (coll, docs, cb) {
  return context.models[coll].create(docs, cb);
};

exports.del = function (coll, cb) {
  return context.models[coll].destroyAll(cb);
};

exports.close = function (cb) {
  // TODO
};
