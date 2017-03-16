#!/usr/bin/env node
import * as fs from "fs";
import * as Jasmine from "jasmine";
import * as Command from "jasmine/lib/command";
import * as path from "path";
import "ts-node/register";

const jasmine = new Jasmine({ projectBaseDir: path.resolve() });
const examplesDir = path.join("node_modules", "jasmine-core", "lib", "jasmine-core", "example", "node_example");
const command = new Command(path.resolve(), examplesDir, console.log);

const initReporters = () => {
  const configPath = process.env.JASMINE_CONFIG_PATH || "spec/support/jasmine.json";
  const config = JSON.parse(fs.readFileSync(path.resolve(configPath), "utf8"));
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

initReporters();

command.run(jasmine, process.argv.slice(2));
