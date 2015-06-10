'use strict';

module.exports = function getUrlOfDep(name, version, filename) {
    return '//cdnjs.cloudflare.com/ajax/libs/' + [name, version, filename].join('/');
};
