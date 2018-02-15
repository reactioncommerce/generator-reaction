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
        default: false,
        message: "Perform a full Yarn install? (Will take much longer.)",
        name: "isFullYarnInstallEnabled",
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

    // Yarn
    if (!this.props.isFullYarnInstallEnabled) {
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
    } else {
      // Modify package.json?
    }

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
    if (this.props.isFullYarnInstallEnabled) {
      // Dependencies
      this.yarnInstall(["bunyan", "bunyan-format", "graphql-yoga"]);

      // Dev dependencies
      this.yarnInstall(
        [
          "@reactioncommerce/eslint-config",
          "babel-cli",
          "babel-eslint",
          "babel-preset-env",
          "babel-preset-stage-2",
          "eslint",
          "eslint-config-prettier",
          "eslint-plugin-babel",
          "eslint-plugin-import",
          "eslint-plugin-jest",
          "eslint-plugin-jsx-a11y",
          "eslint-plugin-prettier",
          "eslint-plugin-react",
          "jest",
          "jest-junit",
          "nodemon",
          "prettier@1.10.2",
          "prettier-check",
          "rimraf"
        ],
        { dev: true }
      );
    }

    this.log("\nCreating .env from .env.example");
    this.spawnCommand("./bin/setup", { stdio: "ignore" });
    this.log(chalk.bold.green("Created .env"));
  }

  end() {
    if (this.props.isFullYarnInstallEnabled) {
      this.fs.copy(
        this.templatePath(".yarnrc"),
        this.destinationPath(".yarnrc")
      );

      this.log(chalk.bold.yellow("IMPORTANT:"));
      this.log(
        "Choose 'y' to overwrite node_modules when prompted. " +
          "This will simply delete the node_modules directory that was " +
          "created during the installation . We'll rebuild the dependencies " +
          "via a Docker build to run the project.\n" +
          "The project may not run properly if you don't choose 'y'."
      );
      this.log("\nUse Docker Compose from here on out.");
      this.fs.delete(this.destinationPath("node_modules"));
    }

    this.log(chalk.bold.green("\nGenerator setup finished."));
    this.log("If you see no errors above, run the server with Docker Compose:");
    this.log(chalk.bold.white("docker-compose up\n"));
  }
};
