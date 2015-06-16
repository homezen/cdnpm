'use strict';

var _ = require('ls-lodash'),
    getStats = require('./registry/get-stats'),
    getDepVersions = require('./npm/get-dep-versions');

module.exports = function getWebpackExternals() {
    return getDepVersions()
        .then(getStats)
        .then(function(validDeps) {
            return _(validDeps)
                .map(function(depObj) {
                    return [depObj.name, 'window.' + depObj.globalName];
                }).zipObject().valueOf();
        });
};
