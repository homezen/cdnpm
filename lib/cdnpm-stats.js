'use strict';

module.exports = function cdnpmStats(yargs) {
    var q = require('q'),
        _ = require('ls-lodash'),
        argv = yargs.argv,
        console = require('console'),
        CliTable = require('cli-table'),
        registryGetStats = require('./registry/get-stats'),
        npmLoadPromise = require('./get-npm')();

    npmLoadPromise.then(function(npm) {
        return q.ninvoke(npm.commands, 'ls', [], true);
    }).then(function(lsResults) {
        var depVersions = _.mapValues(_.first(lsResults).dependencies, 'version');

        return registryGetStats(depVersions);
    }).then(function(statsResults) {
        var outTable = new CliTable({
            head: ['version', 'name', 'size (min)']
        });

        outTable.push.apply(outTable, _.map(statsResults, function(result) {
            return [result.name, result.version, result.size];
        }));

        console.log(outTable.toString());
    }).fail(_.flow(_.property('stack'), console.error));
};
