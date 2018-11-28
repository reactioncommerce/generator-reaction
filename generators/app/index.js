'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    // Pass props by reference to child generators so that when we
    // mutate them with prompt answers, the children can see them.
    this.options.props = this.options.props || {};

    const backendGenerator = require.resolve('../backend');
    const baseGenerator = require.resolve('../base');
    const circleGenerator = require.resolve('../circleci');
    const docsGenerator = require.resolve('../docs');
    const frontendGenerator = require.resolve('../frontend');

    // Register sub generators as individual tasks.
    this.env.register(docsGenerator, 'reaction:docs');
    this.env.register(circleGenerator, 'reaction:circleci');

    // Run these generators in order.
    this.composeWith(baseGenerator, { props: this.options.props });
    this.composeWith(backendGenerator, { props: this.options.props });
    this.composeWith(frontendGenerator, { props: this.options.props });
    this.composeWith(docsGenerator, { props: this.options.props });
    this.composeWith(circleGenerator, { props: this.options.props });
  }

  prompting() {
    this.options.props = this.options.props || {};

    // Capture all provided option params into the props context.
    // Allows user to define settings at the command line.
    Object.keys(this.options).forEach(key => {
      this.options.props[key] = this.options[key];
    });

    this.log(yosay('Welcome to the ' + chalk.red('reaction') + ' generator.'));

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
      }
    ];

    return this.prompt(prompts).then(props => {
      Object.keys(props).forEach(key => {
        this.options.props[key] = props[key];
      });
    });
  }
};
