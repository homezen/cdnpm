'use strict';

module.exports = function cdnpmDryTags(yargs) {
    var q = require('q'),
        _ = require('ls-lodash'),
        argv = yargs.argv,
        console = require('console'),
        getScriptTags = require('../get-script-tags');

    getScriptTags()
        .then(function(scriptTags) {
            console.log(scriptTags);
        }).fail(_.flow(_.property('stack'), console.error));
};
