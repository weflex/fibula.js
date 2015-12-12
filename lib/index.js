'use strict';

const path = require('path');
const glob = require('glob').sync;
const fixturesDir = process.cwd() + '/test/fixtures';

// define caches
const dirs = new Map();

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
  let files;
  if (!dirs.has(name)) {
    files = glob(fixturesDir + '/' + name + '/*.@(js|json)').map(parse);
    dirs.set(name, files);
  } else {
    files = dirs.get(name);
  }
  return files.map(del).map(put);
};
