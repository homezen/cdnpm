'use strict';

module.exports = function cdnpmDryWebpack(yargs) {
    var q = require('q'),
        _ = require('ls-lodash'),
        argv = yargs.argv,
        console = require('console'),
        getWebpackExternals = require('../get-webpack-externals');

    getWebpackExternals()
        .then(function(webpackExternals) {
            console.log(JSON.stringify(webpackExternals, undefined, 2));
        }).fail(_.flow(_.property('stack'), console.error));
};
