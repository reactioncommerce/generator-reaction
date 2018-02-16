"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    const defaultDockerRepository = this.options.projectName
      ? `reactioncommerce/${this.options.projectName}`
      : null;

    const prompts = [
      {
        default: defaultDockerRepository,
        message: "Docker repository.",
        name: "dockerRepository",
        type: "input"
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }
  writing() {
    const opts = this.props;

    this.fs.copyTpl(
      this.templatePath("circleci/config-workflow-docker.yml"),
      this.destinationPath(".circleci/config.yml"),
      opts
    );
    this.fs.copy(
      this.templatePath("circleci/bin"),
      this.destinationPath(".circleci/bin")
    );
  }
};
