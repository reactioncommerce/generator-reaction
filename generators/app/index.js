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

    // Project Files
    this.fs.copyTpl(
      this.templatePath(".circleci/config-workflow-docker.yml"),
      this.destinationPath(".circleci/config.yml"),
      this.props
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
    this.fs.copy(
      this.templatePath("CODE_OF_CONDUCT.md"),
      this.destinationPath("CODE_OF_CONDUCT.md")
    );
    this.fs.copy(
      this.templatePath("LICENSE.md"),
      this.destinationPath("LICENSE.md")
    );
  }

  install() {
    // Dependencies
    this.yarnInstall(["bunyan"], { dev: true });
    this.yarnInstall(["bunyan-format"], { dev: true });
    this.yarnInstall(["graphql-yoga"], { dev: true });

    // Dev dependencies
    this.yarnInstall(["@reactioncommerce/eslint-config"], { dev: true });
    this.yarnInstall(["babel-cli"], { dev: true });
    this.yarnInstall(["babel-eslint"], { dev: true });
    this.yarnInstall(["babel-preset-env"], { dev: true });
    this.yarnInstall(["babel-preset-stage-2"], { dev: true });
    this.yarnInstall(["eslint"], { dev: true });
    this.yarnInstall(["eslint-config-prettier"], { dev: true });
    this.yarnInstall(["eslint-plugin-babel"], { dev: true });
    this.yarnInstall(["eslint-plugin-import"], { dev: true });
    this.yarnInstall(["eslint-plugin-jest"], { dev: true });
    this.yarnInstall(["eslint-plugin-jsx-a11y"], { dev: true });
    this.yarnInstall(["eslint-plugin-prettier"], { dev: true });
    this.yarnInstall(["eslint-plugin-react"], { dev: true });
    this.yarnInstall(["jest"], { dev: true });
    this.yarnInstall(["jest-junit"], { dev: true });
    this.yarnInstall(["nodemon"], { dev: true });
    this.yarnInstall(["prettier@1.10.2"], { dev: true, exact: true });
    this.yarnInstall(["prettier-check"], { dev: true });
    this.yarnInstall(["rimraf"], { dev: true });

    this.log("\nCreating .env from .env.example");
    this.spawnCommand("./bin/setup", { stdio: "ignore" });
    this.log(chalk.bold.green("Created .env"));
  }

  end() {
    this.fs.copy(this.templatePath(".yarnrc"), this.destinationPath(".yarnrc"));

    this.log("Removing node modules. Use Docker Compose from here on out.");
    this.fs.delete(this.destinationPath("node_modules"));

    this.log(chalk.bold.green("\nGenerator setup finished."));
    this.log("If you see no errors above, run the server with Docker Compose:");
    this.log(chalk.bold.white("docker-compose up\n"));
  }
};
