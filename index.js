#!/usr/bin/env node
require("ts-node/register");
var path = require("path");
var fs = require("fs");
var Jasmine = require("jasmine");
var Command = require("jasmine/lib/command.js");

var jasmine = new Jasmine({ projectBaseDir: path.resolve() });
var examplesDir = path.join("node_modules", "jasmine-core", "lib", "jasmine-core", "example", "node_example");
var command = new Command(path.resolve(), examplesDir, console.log);

var initReporters = () => {
  var configPath = process.env.JASMINE_CONFIG_PATH || "spec/support/jasmine.json";
  var config = JSON.parse(fs.readFileSync(path.resolve(configPath)));
  if(config.reporters && config.reporters.length > 0) {
    config.reporters.forEach(reporter =>
      jasmine.addReporter(new (require(reporter.name))(reporter.options))
    );
  }
};

initReporters();

command.run(jasmine, process.argv.slice(2));