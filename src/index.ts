#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import "ts-node/register";

const Jasmine = require("jasmine");
const Command = require("jasmine/lib/command");

const jasmine = new Jasmine({ projectBaseDir: path.resolve() });
const examplesDir = path.join("node_modules", "jasmine-core", "lib", "jasmine-core", "example", "node_example");
const command = new Command(path.resolve(), examplesDir, console.log);
const configPath = process.env.JASMINE_CONFIG_PATH || "spec/support/jasmine.json";

const initReporters = (config: any) => {
  if (config.reporters && config.reporters.length > 0) {
    config.reporters.forEach((reporter: {name: string, options: any}) => {
      const parts = reporter.name.split("#");
      const name = parts[0];
      const member = parts[1];
      const reporterClass = member ? require(name)[member] : require(name);
      jasmine.addReporter(new (reporterClass)(reporter.options));
    });
  }
};

let configJSON: string;
try {
  configJSON = fs.readFileSync(path.resolve(configPath), "utf8");
} catch (e) { }

if(configJSON) {
  const config = JSON.parse(configJSON);
  initReporters(config);
}

command.run(jasmine, process.argv.slice(2));
