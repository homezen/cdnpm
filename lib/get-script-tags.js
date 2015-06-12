'use strict';

var _ = require('ls-lodash'),
    cdnpmConfig = require('./cdnpm-config').get(),
    getStats = require('./registry/get-stats'),
    getDepVersions = require('./npm/get-dep-versions'),
    scriptTemp = '<script type="text/javascript" src="<%= scriptUrl %>"></script>';

module.exports = function getScriptTags() {
    return getDepVersions()
        .then(getStats)
        .then(function(validDeps) {
            return _.map(validDeps, function(depRecord) {
                return _.template(scriptTemp)({ scriptUrl: depRecord.url });
            }).join('\n');
        });
};
