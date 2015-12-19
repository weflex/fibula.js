#!/usr/bin/env sh

node_modules/.bin/mocha test/parallel/test-simple.js && \
node_modules/.bin/mocha test/parallel/test-async.js