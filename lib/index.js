'use strict';

const path = require('path');
const glob = require('glob').sync;
const fixturesDir = process.cwd() + '/test/fixtures';

function parse (p) {
  const meta = require(p);
  const pmatch = /(\.js|\.json)$/i.exec(p);
  meta.name = path.basename(p, pmatch[1]);
  if (typeof meta.adapter === 'string') {
    meta.adapter = require('./adapters/' + meta.adapter);
  }
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
  const files = glob(fixturesDir + '/' + name + '/*.@(js|json)');
  return files.map(parse).map(del).map(put);
};