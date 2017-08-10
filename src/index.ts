#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import { register } from "ts-node/dist";
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
];

const tsNodeOptions = Object.assign({}, ...TS_NODE_OPTIONS.map((option) => argv[option] && {[option]: argv[option]}));
register(tsNodeOptions);

const Jasmine = require("jasmine");
const Command = require("jasmine/lib/command");

const jasmine = new Jasmine({ projectBaseDir: path.resolve() });
const examplesDir = path.join("node_modules", "jasmine-core", "lib", "jasmine-core", "example", "node_example");
const command = new Command(path.resolve(), examplesDir, console.log);
const configPath = argv.config || process.env.JASMINE_CONFIG_PATH || "spec/support/jasmine.json";

const initReporters = (config: any) => {
  if (config.reporters && config.reporters.length > 0) {
    jasmine.env.clearReporters();
    config.reporters.forEach((reporter: {name: string, options: any}) => {
      const parts = reporter.name.split("#");
      const name = parts[0];
      const member = parts[1];
      const reporterClass = member ? require(name)[member] : require(name);
      jasmine.addReporter(new (reporterClass)(reporter.options));
    });
  }
};

let configJSON: string = "";
try {
  configJSON = fs.readFileSync(path.resolve(configPath), "utf8");
} catch (e) { }

if (configJSON) {
  const config = JSON.parse(configJSON);
  initReporters(config);
}

command.run(jasmine, process.argv.slice(2));
