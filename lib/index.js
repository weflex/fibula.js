'use strict';

const path = require('path');
const glob = require('glob').sync;
const fixturesDir = process.cwd() + '/test/fixtures';

function parse (p) {
  const meta = require(p);
  meta.name = path.basename(p, '.json');
  meta.adapter = require('./adapters/' + meta.adapter);
  return meta;
}

function del (meta) {
  meta.adapter.del();
  return meta;
}

function put (meta) {
  meta.adapter.put(meta.name, meta.data);
  return meta
}

exports.use = function (name) {
  const files = glob(fixturesDir + '/' + name + '/*.json');
  return files.map(parse).map(del).map(put);
};