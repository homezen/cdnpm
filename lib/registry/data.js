'use strict';

var _ = require('ls-lodash');

// Currently PoC, TODO: better registry data solution
module.exports = _.mapValues({
    lodash: {
        name: 'lodash.js',
        globalName: '_'
    },

    react: {
        globalName: 'React'
    },

    'react-router': {
        filename: 'ReactRouter.min.js',
        globalName: 'ReactRouter',
        dependencies: ['react']
    },

    q: {
        name: 'q.js',
        globalName: 'Q'
    }
}, function(depData, depKey) {
    return _.safeMerge(depData,
        depData.name ? null : { name: depKey },
        depData.filename ? null : { filename: depKey + '.min.js' },
        depData.globalName ? null : { globalName: depKey },
        depData.dependencies ? null : { dependencies: [] }
    );
});
