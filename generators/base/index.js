'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const rimraf = require('rimraf');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        default: '0.1.0',
        message: 'Version',
        name: 'projectVersion',
        type: 'input'
      },
      {
        message: 'Description',
        name: 'projectDescription',
        type: 'input'
      },
      {
        message: 'Keywords',
        name: 'projectKeywords',
        type: 'input'
      },
      {
        default: 'Reaction Commerce',
        message: 'Author',
        name: 'projectAuthor',
        type: 'input'
      },
      {
        default: 'engineering@reactioncommerce.com',
        message: 'Author Email',
        name: 'projectAuthorEmail',
        type: 'input'
      },
      {
        message: 'Keep NPM repository private?',
        name: 'isNPMPrivate',
        type: 'confirm'
      }
    ];

    return this.prompt(prompts).then(props => {
      // We must mutate this.options.props here so that all composed generators can see
      Object.keys(props).forEach(key => {
        this.options.props[key] = props[key];
      });
    });
  }

  writing() {
    const templateProps = this.options.props;

    // Docker
    this.fs.copyTpl(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile'),
      templateProps
    );

    this.fs.copy(
      this.templatePath('.dockerignore'),
      this.destinationPath('.dockerignore')
    );

    this.fs.copyTpl(
      this.templatePath('.env.example'),
      this.destinationPath('.env.example'),
      templateProps
    );

    // Project Files
    this.fs.copy(this.templatePath('.reaction'), this.destinationPath('.reaction'));
    this.fs.copy(this.templatePath('bin'), this.destinationPath('bin'));
    this.fs.copy(this.templatePath('reports'), this.destinationPath('reports'));
    this.fs.copy(
      this.templatePath('CODE_OF_CONDUCT.md'),
      this.destinationPath('CODE_OF_CONDUCT.md')
    );
    this.fs.copy(this.templatePath('LICENSE.md'), this.destinationPath('LICENSE.md'));
  }

  install() {
    this.log('\nCreating .env from .env.example');
    this.spawnCommand('./bin/setup', { stdio: 'ignore' });
    this.log(chalk.bold.green('Created .env'));
  }

  end() {
    this.fs.copy(this.templatePath('.yarnrc'), this.destinationPath('.yarnrc'));

    this.log('Deleting node_modules...');
    rimraf.sync(this.destinationPath('node_modules'));

    this.log(chalk.bold.green('\nGenerator setup finished.'));
    this.log('If you see no errors above, run the project with Docker Compose:');
    this.log(chalk.bold.white('docker-compose up\n'));
  }
};
