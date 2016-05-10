'use strict'

const path = require('path');
const once = require('once');
const glob = require('glob').sync;
const promisify = require('es6-promisify');
const debug = require('debug')('fibula');
const fixturesDir = process.cwd() + '/test/fixtures';

// define caches
const dirs = new Map();
var currentDir;

exports.use = function (name, context, cb) {
  // normalize the arguments
  if (typeof arguments[1] === 'function' && 
    arguments.length === 2) {
    cb = arguments[1];
    context = false;
  }
  var files;
  if (!dirs.has(name)) {
    debug(`${name} does not have caches, parsing a new one`);
    let adapters = [];
    files = glob(fixturesDir + '/' + name + '/*.@(js|json)').map(
      // parse the adapters
      function parse (p) {
        const meta = require(p);
        const pmatch = /(\.js|\.json)$/i.exec(p);
        meta.name = path.basename(p, pmatch[1]);
        if (typeof meta.adapter === 'string') {
          meta.adapter = require('./adapters/' + meta.adapter);
          if (typeof meta.adapter.setContext === 'function' && context) {
            meta.adapter.setContext(context);
          }
          adapters.push(meta.adapter);
        }
        return meta;
      }
    );
    files.adapters = adapters;
    dirs.set(name, files);
  } else {
    debug(`read ${name} from caches`);
    files = dirs.get(name);
  }
  currentDir = files;

  // check if we should async the progress
  if (typeof cb !== 'function') {
    debug('sync mode');
    files.adapters.map(function (adapter) {
      adapter.del();
    });
    return files.map(function (meta) {
      meta.adapter.put(meta.name, meta.data, cb);
      return meta;
    });
  } else {
    debug('async mode');
    // delete documents tasks from adapters
    let deleteTasks = function () {
      return Promise.all(
        files.adapters.map(function (adapter) {
          return Promise.all(
            files.map(function (meta) {
              return promisify(adapter.del)(meta.name);
            })
          );
        })
      );
    };
    // close connections tasks from adapters
    let closeTasks = function () {
      return Promise.all(
        files.adapters.map(function (adapter) {
          return promisify(adapter.close)();
        })
      );
    };
    // put fixtures to databases from files/metadatas
    let putTasks = function () {
      return Promise.all(
        files.map(function (meta) {
          return promisify(meta.adapter.put)(meta.name, meta.data);
        })
      );
    };
    // start running progress
    cb = once(cb);
    deleteTasks().then(function () {
      debug('deleted adapters');
      return putTasks();
    }).then(function (data) {
      debug('put fixtures to corresponding adapters');
      return data;
    }).then(function (data) {
      cb(null);
    }).then(function () {
      debug('closing connections');
      return closeTasks();
    }).catch(function (err) {
      console.error(err);
      cb(err);
    });
  }
};

exports.get = function (filename) {
  let ret;
  for (let meta of currentDir) {
    if (filename === meta.name) {
      ret = meta.data;
      break;
    }
  }
  return ret;
};
