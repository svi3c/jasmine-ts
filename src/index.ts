#!/usr/bin/env node
import * as path from "path";
import {register} from "ts-node";
import yargs from "yargs";

const argv = yargs(process.argv.slice(2))
  .scriptName('jasmine-ts')
  .usage('$0 [options]')
  .option('r', {
    alias: 'require',
    describe: 'Require a node module before execution',
  })
  .option('T', {
    alias: 'transpile-only',
    type: 'boolean',
    default: false,
    describe: '[ts-node] Use TypeScript\'s faster `transpileModule`'
  })
  .option('I', {
    alias: 'ignore',
    describe: '[ts-node] Override the path patterns to skip compilation'
  })
  .option('P', {
    alias: 'project',
    describe: '[ts-node] Path to TypeScript JSON project file'
  })
  .option('C', {
    alias: 'compiler',
    describe: '[ts-node] Specify a custom TypeScript compiler'
  })
  .option('D', {
    alias: 'ignore-diagnostics',
    describe: '[ts-node] Ignore TypeScript warnings by diagnostic code'
  })
  .option('O', {
    alias: 'compiler-options',
    describe: '[ts-node] JSON object to merge with compiler options'
  })
  .option('dir', {
    describe: '[ts-node] Specify working directory for config resolution'
  })
  .option('scope', {
    describe: '[ts-node] Scope compiler to files within `cwd` only'
  })
  .option('files', {
    describe: '[ts-node] Load `files`, `include` and `exclude` from `tsconfig.json` on startup'
  })
  .option('pretty', {
    describe: '[ts-node] Use pretty diagnostic formatter (usually enabled by default)'
  })
  .option('skip-project', {
    describe: '[ts-node] Skip reading `tsconfig.json`'
  })
  .option('skip-ignore', {
    describe: '[ts-node] Skip `--ignore` checks'
  })
  .option('prefer-ts-exts', {
    describe: '[ts-node] Prefer importing TypeScript files over JavaScript files'
  })
  .option('log-error', {
    describe: '[ts-node] Logs TypeScript errors to stderr instead of throwing exceptions'
  })
  .option('no-color', {
    describe: '[jasmine] Turn off color in spec output',
    type: 'boolean'
  })
  .option('color', {
    describe: '[jasmine] Force turn on color in spec output',
    type: 'boolean'
  })
  .option('filter', {
    describe: '[jasmine] Filter specs to run only those that match the given string'
  })
  .option('helper', {
    describe: '[jasmine] Load helper files that match the given string'
  })
  .option('stop-on-failure', {
    describe: '[jasmine] Stop spec execution on expectation failure',
    type: 'boolean'
  })
  .option('fail-fast', {
    describe: '[jasmine] Stop Jasmine execution on spec failure',
    type: 'boolean'
  })
  .option('config', {
    describe: '[jasmine] Path to your optional jasmine.json'
  })
  .option('reporter', {
    describe: '[jasmine] Path to reporter to use instead of the default Jasmine reporter'
  })
  .option('random', {
    describe: '[jasmine] Tells jasmine to run specs in semi random order or not for this run, overriding',
    type: 'boolean'
  })
  .option('seed', {
    describe: '[jasmine] TSets the randomization seed if randomization is turned on',
    type: 'number'
  })
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .argv as any;

const TS_NODE_OPTIONS = [
  'require',
  "transpileOnly",
  "ignore",
  "project",
  "compiler",
  "ignoreDiagnostics",
  "compilerOptions",
  "dir",
  "scope",
  "files",
  "pretty",
  "skipProject",
  "skipIgnore",
  "preferTsExts",
  "logError"
];

const tsNodeOptions = TS_NODE_OPTIONS.reduce((options, option) => {
  if (argv[option]) {
    if (option === "compilerOptions") {
      options[option] = JSON.parse(argv[option] as string)
    } else if (option === 'require') {
      if (Array.isArray(argv[option])) {
        options[option] = argv[option]
      } else {
        options[option] = [argv[option]]
      }
    } else {
      options[option] = argv[option]
    }
  }

  return options;
}, {} as any)

register(tsNodeOptions);

const Jasmine = require("jasmine");
const Command = require("jasmine/lib/command");

const jasmine = new Jasmine({projectBaseDir: path.resolve()});
const examplesDir = path.join("node_modules", "jasmine-core", "lib", "jasmine-core", "example", "node_example");
const command = new Command(path.resolve(), examplesDir, console.log);

const JASMINE_OPTIONS = [
  'no-color',
  'color',
  'filter',
  'helper',
  'stop-on-failure',
  'fail-fast',
  'config',
  'reporter',
  'random',
  'seed'
]

const commandOptions = JASMINE_OPTIONS
  .filter(option => option in argv)
  .map(option => {
    switch (option) {
      case 'color':
        return argv.color ? '--color' : '--no-color'

      case 'no-color':
        return argv['no-color'] ? '--no-color' : undefined;

      case 'stop-on-failure':
        return argv['stop-on-failure'] ? '--stop-on-failure=true' : '--stop-on-failure=false'

      case 'fail-fast':
        return argv['fail-fast'] ? '--fail-fast=true' : '--fail-fast=false'

      case 'random':
        return argv.random? '--random=true' : '--random=false'

      default:
        return `--${option}=${argv[option]}`
    }
  })
  .filter(option => option !== undefined)

const files: string[] = [];

for (const arg of argv._) {
  if (typeof arg === 'string') {
    if (arg.startsWith('-'))
      break;

    files.push(arg)
  } else
    files.push(arg.toString())
}

command.run(jasmine, [...commandOptions, ...files]);
