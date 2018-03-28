'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    const templateProps = this.options.props;

    this.fs.copy(this.templatePath('docs'), this.destinationPath('docs'), templateProps);

    this.fs.copy(
      this.templatePath('adr.json'),
      this.destinationPath('.adr.json'),
      templateProps
    );
  }

  install() {
    this.yarnInstall(['adr'], { dev: true });
  }
};
