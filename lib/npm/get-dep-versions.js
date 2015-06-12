'use strict';

var q = require('q'),
    _ = require('ls-lodash'),
    npmLoadPromise = require('./get-npm')();

module.exports = _.once(function getDepVersions() {
    return npmLoadPromise.then(function(npm) {
        return q.ninvoke(npm.commands, 'ls', [], true);
    }).then(function(lsResults) {
        return _.mapValues(_.first(lsResults).dependencies, 'version');
    });
});
