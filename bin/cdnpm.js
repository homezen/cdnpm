#!/usr/bin/env node

'use strict';

var pkgJson = require('../package.json'),
    cmdHandlers = require('../lib/cmd-handlers'),
    argv = require('yargs');

argv.usage(pkgJson.name + ' <command>')
    .demand(1, '*** Oops! Must provide a command, plz! ***')
    .command('stats', 'Show available CDN libs and their sizes', cmdHandlers.stats)
    .command('dry-tags', 'Show script tags that would be emitted by API', cmdHandlers.dryTags)
    .version(pkgJson.version)
    .help('h')
    .alias('h', 'help')
    .strict()
    .argv;
