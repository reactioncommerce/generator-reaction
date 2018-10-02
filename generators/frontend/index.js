'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    const templateProps = this.options.props;
    if (templateProps.projectType !== 'frontend') return;

    // Package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      templateProps
    );

    // Project Files
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      templateProps
    );

    this.fs.copyTpl(
      this.templatePath('docker-compose.yml'),
      this.destinationPath('docker-compose.yml'),
      templateProps
    );

    // Git
    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      templateProps
    );

    // App files
    this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'), templateProps);
    this.fs.copy(this.templatePath('public'), this.destinationPath('public'));
  }

  install() {
    const templateProps = this.options.props;
    if (templateProps.projectType !== 'frontend') return;

    // Dependencies
    this.yarnInstall(['react@^16.2.0', 'react-dom@^16.2.0', 'react-scripts@1.1.1']);

    // Dev dependencies
    this.yarnInstall(
      [
        '@reactioncommerce/eslint-config@^1.0.1',
        'babel-cli@^6.26.0',
        'babel-eslint@^8.2.1',
        'babel-preset-env@^1.6.1',
        'babel-preset-stage-2@^6.24.1',
        'eslint@^4.17.0',
        'eslint-plugin-babel@^4.1.2',
        'eslint-plugin-import@^2.8.0',
        'eslint-plugin-jest@^21.12.1',
        'eslint-plugin-jsx-a11y@^6.0.3',
        'eslint-plugin-react@^7.6.1',
        'jest-junit@3.6.0',
        'rimraf@^2.6.2',
        'snyk@^1.69'
      ],
      { dev: true }
    );
  }
};
