'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const rimraf = require('rimraf');

module.exports = class extends Generator {
  prompting() {
    this.options.props = this.options.props || {};

    var prompts = [
      {
        message: 'Project Name',
        name: 'projectName',
        type: 'input',
        validate(value) {
          if (typeof value !== 'string' || value.length === 0)
            return 'Project name is required!';
          if (value.indexOf(' ') > -1) return 'No spaces allowed!';
          return true;
        },
        when: () => !Object.keys(this.options.props).includes('projectName')
      },
      {
        choices: ['frontend', 'backend'],
        message: 'Project Type',
        name: 'projectType',
        type: 'list',
        validate(value) {
          if (typeof value !== 'string' || value.length === 0)
            return 'You must choose a project type!';
          return true;
        },
        when: () => !Object.keys(this.options.props).includes('projectType')
      },
      {
        default: '0.1.0',
        message: 'Version',
        name: 'projectVersion',
        type: 'input',
        when: () => !Object.keys(this.options.props).includes('projectVersion')
      },
      {
        message: 'Description',
        name: 'projectDescription',
        type: 'input',
        when: () => !Object.keys(this.options.props).includes('projectDescription')
      },
      {
        message: 'Keywords',
        name: 'projectKeywords',
        type: 'input',
        when: () => !Object.keys(this.options.props).includes('projectKeywords')
      },
      {
        default: 'Reaction Commerce',
        message: 'Author',
        name: 'projectAuthor',
        type: 'input',
        when: () => !Object.keys(this.options.props).includes('projectAuthor')
      },
      {
        default: 'hello@reactioncommerce.com',
        message: 'Author Email',
        name: 'projectAuthorEmail',
        type: 'input',
        when: () => !Object.keys(this.options.props).includes('projectAuthorEmail')
      },
      {
        message: 'Keep NPM repository private?',
        name: 'isNPMPrivate',
        type: 'confirm',
        when: () => !Object.keys(this.options.props).includes('isNPMPrivate')
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
