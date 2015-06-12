'use strict';

var q = require('q'),
    _ = require('ls-lodash'),
    npm = require('npm'),
    npmConfigOverrides = {};

module.exports = _.constant(q.ninvoke(npm, 'load', npmConfigOverrides));
