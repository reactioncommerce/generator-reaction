"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath("docs"),
      this.destinationPath("docs"),
      this.props
    );

    this.fs.copy(
      this.templatePath("adr.json"),
      this.destinationPath(".adr.json"),
      this.props
    );
  }

  install() {
    this.yarnInstall(["adr"], { dev: true });
  }
};
