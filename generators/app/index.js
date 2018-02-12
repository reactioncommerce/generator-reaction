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
      },
      {
        default: true,
        message: "Enable GraphQL?",
        name: "includeGraphQL",
        type: "confirm"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // package.json
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      this.props
    );
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
