'use strict';

var _ = require('ls-lodash'),
    cdnpmConfig = require('./cdnpm-config');

module.exports = function cdnpmApi(configObj) {
    if (_.isPlainObject(configObj)) {
        cdnpmConfig.update(configObj);
    }

    return {
        getScriptTags: require('./get-script-tags'),
        getWebpackExternals: require('./get-webpack-externals')
    };
};
