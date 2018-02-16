"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This makes `projectName` a required argument.
    this.argument("projectName", { type: String, required: true });
  }

  initializing() {
    const opts = this.options;
    this.composeWith(require.resolve("../base"), opts);
    this.composeWith(require.resolve("../docs"));
    this.composeWith(require.resolve("../circleci"), opts);
  }

  prompting() {
    this.log(
      yosay(
        "Welcome to the excellent " +
          chalk.red("generator-reaction-next") +
          " generator!"
      )
    );
  }
};
