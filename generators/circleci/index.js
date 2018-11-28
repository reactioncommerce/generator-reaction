'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    this.options.props = this.options.props || {};

    const { projectName } = this.options.props;
    const defaultDockerRepository = projectName
      ? `reactioncommerce/${projectName}`
      : null;

    const prompts = [
      {
        default: defaultDockerRepository,
        message: 'Docker repository.',
        name: 'dockerRepository',
        type: 'input',
        when: () => !Object.keys(this.options.props).includes('dockerRepository')
      },
      {
        message: 'Is Docker repo private?',
        name: 'isDockerPrivate',
        type: 'confirm',
        when: () => !Object.keys(this.options.props).includes('isDockerPrivate')
      }
    ];

    return this.prompt(prompts).then(props => {
      // Mutate this.options.props to share with composed generators.
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
