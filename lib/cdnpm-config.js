'use strict';

var _ = require('ls-lodash'),
    configObj = {};

module.exports = {
    get: _.constant(configObj),
    update: _.partial(_.merge, configObj)
};
