"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        "Welcome to the excellent " +
          chalk.red("generator-reaction-next") +
          " generator!"
      )
    );

    const prompts = [
      {
        default: "reaction-demo",
        message: "Your project name.",
        name: "projectName",
        type: "input"
      },
      {
        default: "0.1.0",
        message: "Version",
        name: "projectVersion",
        type: "input"
      },
      {
        message: "Description",
        name: "projectDescription",
        type: "input"
      },
      {
        message: "Keywords",
        name: "projectKeywords",
        type: "input"
      },
      {
        message: "Author",
        name: "projectAuthor",
        store: true,
        type: "input"
      },
      {
        message: "Author Email",
        name: "projectAuthorEmail",
        store: true,
        type: "input"
      },
      {
        message: "Keep NPM repository private?",
        name: "isNPMPrivate",
        type: "confirm"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Package.json
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      this.props
    );

    // Project Files
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      this.props
    );

    // Docker
    this.fs.copy(
      this.templatePath("Dockerfile"),
      this.destinationPath("Dockerfile")
    );

    this.fs.copyTpl(
      this.templatePath("docker-compose.yml"),
      this.destinationPath("docker-compose.yml"),
      this.props
    );

    this.fs.copy(
      this.templatePath(".dockerignore"),
      this.destinationPath(".dockerignore")
    );

    this.fs.copyTpl(
      this.templatePath(".env.example"),
      this.destinationPath(".env.example"),
      this.props
    );

    this.fs.copy(this.templatePath("bin"), this.destinationPath("bin"));

    // Git
    this.fs.copyTpl(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore"),
      this.props
    );

    // Yarn
    // Copy Yarn.lock to support the initial Docker build.
    this.fs.copyTpl(
      this.templatePath("yarn.lock"),
      this.destinationPath("yarn.lock"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath(".yarnrc"),
      this.destinationPath(".yarnrc"),
      this.props
    );

    // Project hygene
    this.fs.copy(
      this.templatePath("CODE_OF_CONDUCT.md"),
      this.destinationPath("CODE_OF_CONDUCT.md")
    );
    this.fs.copy(
      this.templatePath("LICENSE.md"),
      this.destinationPath("LICENSE.md")
    );

    // Project Files

    this.fs.copy(
      this.templatePath(".circleci/config-workflow-docker.yml"),
      this.destinationPath(".circleci/config.yml")
    );
    this.fs.copy(
      this.templatePath(".circleci/.yarnrc"),
      this.destinationPath(".circleci/.yarnrc")
    );
    this.fs.copy(
      this.templatePath(".circleci/bin"),
      this.destinationPath(".circleci/bin")
    );
    this.fs.copy(
      this.templatePath(".reaction"),
      this.destinationPath(".reaction")
    );
    this.fs.copy(this.templatePath("bin"), this.destinationPath("bin"));
    this.fs.copy(this.templatePath("reports"), this.destinationPath("reports"));

    this.fs.copyTpl(
      this.templatePath("src"),
      this.destinationPath("src"),
      this.props
    );
    this.fs.copy(this.templatePath("test"), this.destinationPath("test"));
  }

  install() {
    // We'll not install dependencies because this should be via Docker build.
  }

  end() {
    this.log(chalk.bold.green("\nGenerator setup finished."));
    this.log("If you see no errors above, run the server with Docker Compose:");
    this.log(chalk.bold.white("docker-compose up"));
  }
};
