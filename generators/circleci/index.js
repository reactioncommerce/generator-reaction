'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const { projectName } = this.options.props || {};
    const defaultDockerRepository = projectName
      ? `reactioncommerce/${projectName}`
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
      // We must mutate this.options.props here so that all composed generators can see
      Object.keys(props).forEach(key => {
        this.options.props[key] = props[key];
      });
    });
  }

  writing() {
    const templateProps = this.options.props;
    const [dockerNamespace, dockerName] = templateProps.dockerRepository.split('/');
    const opts = Object.assign({}, templateProps, { dockerNamespace, dockerName });

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
