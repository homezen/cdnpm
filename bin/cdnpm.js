#!/usr/bin/env node

'use strict';

var pkgJson = require('../package.json'),
    cmdHandlers = require('../lib/cmd-handlers'),
    argv = require('yargs')
        .usage(pkgJson.name + ' <command>')
        .demand(1, '*** Oops! Must provide a command, plz! ***')
        .command('stats', 'Show available CDN libs and their sizes', cmdHandlers.stats)
        .version(pkgJson.version)
        .help('h')
        .alias('h', 'help')
        .strict()
        .argv;
