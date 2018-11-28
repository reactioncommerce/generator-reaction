'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  async prompting() {
    this.templateVariables = {};

    let answers = await this.prompt([
      {
        message: 'NPM package name:',
        name: 'packageName',
        type: 'input',
        default: '@reactioncommerce/',
        validate(value) {
          if (typeof value !== 'string' || value.length === 0) {
            return 'You must enter a package name!';
          }
          if (!value.startsWith('@reactioncommerce/')) {
            return 'NPM package names must be in the "@reactioncommerce" scope';
          }
          return true;
        },
        when: () => !Object.keys(this.options.props).includes('packageName')
      }
    ]);
    Object.assign(this.templateVariables, answers);

    answers = await this.prompt([
      {
        message: 'NPM package description:',
        name: 'packageDescription',
        type: 'input',
        validate(value) {
          if (typeof value !== 'string' || value.length === 0) {
            return 'You must enter a package description!';
          }
          return true;
        },
        when: () => !Object.keys(this.options.props).includes('packageDescription')
      }
    ]);
    Object.assign(this.templateVariables, answers);

    answers = await this.prompt([
      {
        message: 'GitHub repository name:',
        name: 'repoName',
        type: 'input',
        default: this.templateVariables.packageName.replace('@reactioncommerce/', ''),
        validate(value) {
          if (typeof value !== 'string' || value.length === 0) {
            return 'You must enter a repository name!';
          }
          return true;
        },
        when: () => !Object.keys(this.options.props).includes('repoName')
      }
    ]);
    Object.assign(this.templateVariables, answers);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('.circleci/config.yml'),
      this.destinationPath('.circleci/config.yml')
    );

    this.fs.copyTpl(
      this.templatePath('.github/ISSUE_TEMPLATE/bug_report.md'),
      this.destinationPath('.github/ISSUE_TEMPLATE/bug_report.md')
    );

    this.fs.copyTpl(
      this.templatePath('.github/pull_request_template.md'),
      this.destinationPath('.github/pull_request_template.md')
    );

    this.fs.copyTpl(
      this.templatePath('src/main.js'),
      this.destinationPath('src/main.js')
    );

    this.fs.copyTpl(
      this.templatePath('src/main.test.js'),
      this.destinationPath('src/main.test.js')
    );

    this.fs.copyTpl(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));

    this.fs.copyTpl(this.templatePath('_npmignore'), this.destinationPath('.npmignore'));

    this.fs.copyTpl(
      this.templatePath('.prettierrc'),
      this.destinationPath('.prettierrc')
    );

    this.fs.copyTpl(
      this.templatePath('CODE_OF_CONDUCT.md'),
      this.destinationPath('CODE_OF_CONDUCT.md')
    );

    this.fs.copyTpl(this.templatePath('LICENSE'), this.destinationPath('LICENSE'));

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.templateVariables
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.templateVariables
    );

    this.fs.copyTpl(
      this.templatePath('docs/README.hbs'),
      this.destinationPath('docs/README.hbs')
    );
  }

  install() {
    this.npmInstall();
  }
};
