#!/usr/bin/env node
program = require('commander');
const path = require('path');
const camel = require('camelcase');
const util = require('./src/utility');
const commands = require('./src/commands');

XPRESSO_DIR = util.getXpressoDirectory();
TEMPLATE_DIR = path.join(XPRESSO_DIR, 'templates');
PROJECT_DIR = '';
PROJECT_PACKAGE = '';
SRC_DIR = '';

program.version('1.0.5', '-v, --version');

program
    .command('init [name]')
    .option('-r, --repo [repo]', 'specify repository for the project')
    .option('-s, --summary [summary]', 'set the summary of the project')
    .option('-d, --dbUrl [dbUrl]', 'specify a development database url')
    .option('--no-auth', 'disables jwt authentication')
    .option('--no-refresh', 'disables rolling token refresh')
    .action((name, cmd) => {
        let names = {
            routeName: camel(name),
            className: camel(name, { pascalCase: true })
        };

        let auth = cmd.auth;
        let refresh = cmd.refresh;
        let dbUrl = cmd.dbUrl;
        let summary = cmd.summary;
        let repo = cmd.repo;

        let options = {
            auth,
            refresh,
            dbUrl,
            summary,
            repo
        };
        commands.init(names, options);
    });

program
    .command('i [name]')
    .option('-r, --repo [repo]', 'specify repository for the project')
    .option('-s, --summary [summary]', 'set the summary of the project')
    .option('-d, --dbUrl [dbUrl]', 'specify a development database url')
    .option('--no-auth', 'disables jwt authentication')
    .option('--no-refresh', 'disables rolling token refresh')
    .action((name, cmd) => {
        if (!name || name === '') {
            console.error('Provide a project name');
            process.exit(1);
        }

        let names = {
            routeName: camel(name),
            className: camel(name, { pascalCase: true })
        };

        let auth = cmd.auth;
        let refresh = cmd.refresh;
        let dbUrl = cmd.dbUrl;
        let summary = cmd.summary;
        let repo = cmd.repo;

        let options = {
            auth,
            refresh,
            dbUrl,
            summary,
            repo
        };
        commands.init(names, options);
    });

program
    .command('generate [name]')
    .option('-w, --websocket', 'add a websocket handler')
    .option('--no-auth', 'disables jwt authentication for the route')
    .action((name, cmd) => {
        if (!name || name === '') {
            console.error('Provide a project name');
            process.exit(1);
        }

        let names = {
            routeName: camel(name),
            className: camel(name, { pascalCase: true })
        };

        let auth = cmd.auth;
        let websocket = cmd.websocket;
        commands.generate(names, {
            auth,
            websocket
        });
    });

program
    .command('g [name]')
    .option('-w, --websocket', 'add a websocket handler')
    .option('--no-auth', 'disables jwt authentication for the route')
    .action((name, cmd) => {
        if (!name || name === '') {
            console.error('Provide a project name');
            process.exit(1);
        }

        let names = {
            routeName: camel(name),
            className: camel(name, { pascalCase: true })
        };

        let auth = cmd.auth;
        let websocket = cmd.websocket;
        commands.generate(names, {
            auth,
            websocket
        });
    });

program.parse(process.argv);
