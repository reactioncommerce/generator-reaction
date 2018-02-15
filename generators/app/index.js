"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve("../base"));
    this.composeWith(require.resolve("../docs"));
  }
};
