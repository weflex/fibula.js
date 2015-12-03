'use strict';

const path = require('path');
const glob = require('glob').sync;
const fixturesDir = process.cwd() + '/test/fixtures';

function parse (p) {
  const meta = require(p);
  const name = path.basename(p, '.json');
  const adapter = require('./adapters/' + meta.adapter);
  const data = meta.data;
  adapter.clear();
  adapter.insert(name, data);
  return data;
}

exports.use = function (name) {
  const files = glob(fixturesDir + '/' + name + '/*.json');
  return files.map(parse);
};