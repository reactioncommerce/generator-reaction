'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    // Pass this.props by reference to child generators so that when we
    // mutate them with prompt answers, the children can see them.
    this.props = {};

    // This writes the main shared project files
    this.composeWith(require.resolve('../base'), { props: this.props });

    // Only frontend or backend will run. They check the `projectType` to determine
    // whether they should do anything.
    this.composeWith(require.resolve('../frontend'), { props: this.props });
    this.composeWith(require.resolve('../backend'), { props: this.props });

    // These run for all project types
    this.composeWith(require.resolve('../docs'), { props: this.props });
    this.composeWith(require.resolve('../circleci'), { props: this.props });
  }

  prompting() {
    this.log(
      yosay(
        'Welcome to the excellent ' + chalk.red('generator-reaction-next') + ' generator!'
      )
    );

    const prompts = [
      {
        message: 'Project Name',
        name: 'projectName',
        type: 'input',
        validate(value) {
          if (typeof value !== 'string' || value.length === 0)
            return 'Project name is required!';
          if (value.indexOf(' ') > -1) return 'No spaces allowed!';
          return true;
        }
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
        }
      }
    ];

    return this.prompt(prompts).then(props => {
      // We must mutate this.props here so that all composed generators can see
      Object.keys(props).forEach(key => {
        this.props[key] = props[key];
      });
    });
  }
};
