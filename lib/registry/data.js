'use strict';

var _ = require('ls-lodash');

module.exports = _.mapValues({
    lodash: { name: 'lodash.js', filename: 'lodash.min.js' },
    react: 'react',
    'react-router': { name: 'react-router', filename: 'ReactRouter.min.js'},
    q: { name: 'q.js', filename: 'q.min.js' },
    superagent: 'superagent'
}, function(depData) {
    if (_.isString(depData)) {
        return { name: depData, filename: depData + '.min.js' };
    }

    return depData;
});
