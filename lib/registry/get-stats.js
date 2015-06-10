'use strict';

var q = require('q'),
    qFs = require('q-io/fs'),
    qHttp = require('q-io/http'),
    _ = require('ls-lodash'),
    numeral = require('numeral'),
    regData = require('./data'),
    getUrlOfDep = require('./get-url-of-dep');

module.exports = function getStats(depVersions) {
    var matchedDeps = _(depVersions).mapValues(function(depVersion, depName) {
        if (regData[depName]) {
            return _.safeMerge(regData[depName], {
                version: depVersion,
                url: getUrlOfDep(regData[depName].name, depVersion, regData[depName].filename)
            });
        }

        return null;
    }).omit(_.isNull).valueOf();

    return q.all(_.map(matchedDeps, function(matchedDep, depName) {
        return qHttp.request(matchedDep.url.replace(/^\/\//, 'http://')).then(function(res) {
            if (res.status < 200 || res.status >= 300) {
                return null;
            }

            return res.body.read().then(function(bodyBuf) {
                return {
                    name: depName,
                    version: matchedDep.version,
                    size: numeral(bodyBuf.length).format('0.0b')
                };
            });
        });
    })).then(_.compact);
};
