'use strict';

var q = require('q'),
    qFs = require('q-io/fs'),
    qHttp = require('q-io/http'),
    _ = require('ls-lodash'),
    numeral = require('numeral'),
    getMatchedDeps = require('./get-matched-deps');

// TODO - cache results for fast fast fast
module.exports = function getStats(depVersions) {
    return q.all(_.map(getMatchedDeps(depVersions), function(matchedDep, depName) {
        return qHttp.request(matchedDep.url.replace(/^\/\//, 'http://')).then(function(res) {
            if (res.status < 200 || res.status >= 300) {
                return null;
            }

            return res.body.read().then(function(bodyBuf) {
                return _.safeMerge(matchedDep, {
                    name: depName,
                    version: matchedDep.version,
                    size: numeral(bodyBuf.length).format('0.0b')
                });
            });
        });
    })).then(_.compact);
};
