'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const defaultDockerRepository = this.options.projectName
      ? `reactioncommerce/${this.options.projectName}`
      : null;

    const prompts = [
      {
        default: defaultDockerRepository,
        message: 'Docker repository.',
        name: 'dockerRepository',
        type: 'input'
      },
      {
        message: 'Is Docker repo private?',
        name: 'isDockerPrivate',
        type: 'confirm'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const [dockerNamespace, dockerName] = this.props.dockerRepository.split('/');
    const opts = Object.assign(this.props, { dockerNamespace, dockerName });

    this.fs.copyTpl(
      this.templatePath('circleci/config-workflow-docker.yml'),
      this.destinationPath('.circleci/config.yml'),
      opts
    );
    this.fs.copy(
      this.templatePath('circleci/bin'),
      this.destinationPath('.circleci/bin')
    );
  }
};