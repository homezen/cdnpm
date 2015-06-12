'use strict';

var _ = require('ls-lodash'),
    regData = require('./data'),
    getUrlOfDep = require('./get-url-of-dep');

module.exports = function getMatchedDeps(depVersions) {
    return _(depVersions).mapValues(function(depVersion, depName) {
        if (regData[depName]) {
            return _.safeMerge(regData[depName], {
                version: depVersion,
                url: getUrlOfDep(regData[depName].name, depVersion, regData[depName].filename)
            });
        }

        return null;
    }).omit(_.isNull).valueOf();
};
