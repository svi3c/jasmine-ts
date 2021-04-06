#!/usr/bin/env node
import * as path from "path";
import { parse, register } from "ts-node";
import { argv } from "yargs";

const TS_NODE_OPTIONS = [
  "fast",
  "lazy",
  "cache",
  "cacheDirectory",
  "compiler",
  "project",
  "ignore",
  "ignoreWarnings",
  "disableWarnings",
  "getFile",
  "fileExists",
  "compilerOptions",
  "transpileOnly",
  "typeCheck",
];

const tsNodeOptions = Object.assign({}, ...TS_NODE_OPTIONS.map((option) => {
  if (argv[option]) {
    return (option === "compilerOptions")
      ? {compilerOptions: parse(argv[option] as string)}
      : {[option]: argv[option]};
  }
}));

register(tsNodeOptions);

const Jasmine = require("jasmine");
const Command = require("jasmine/lib/command");

const jasmine = new Jasmine({projectBaseDir: path.resolve()});
const examplesDir = path.join("node_modules", "jasmine-core", "lib", "jasmine-core", "example", "node_example");
const command = new Command(path.resolve(), examplesDir, console.log);

const JASMINE_OPTIONS = [
  '--no-color',
  '--color',
  '--filter=',
  '--helper=',
  '--require=',
  '--stop-on-failure=',
  '--fail-fast=',
  '--config=',
  '--reporter='
]

function jasmineOptionsFilter(argOption: string): boolean {
  return JASMINE_OPTIONS.some(option => argOption.startsWith(option))
    || !argOption.startsWith('--');
}

const commandOptions = process.argv
  .slice(2)
  .filter(jasmineOptionsFilter)

command.run(jasmine, commandOptions);
