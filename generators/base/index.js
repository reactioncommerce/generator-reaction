'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        default: '0.1.0',
        message: 'Version',
        name: 'projectVersion',
        type: 'input'
      },
      {
        message: 'Description',
        name: 'projectDescription',
        type: 'input'
      },
      {
        message: 'Keywords',
        name: 'projectKeywords',
        type: 'input'
      },
      {
        default: 'Reaction Commerce',
        message: 'Author',
        name: 'projectAuthor',
        type: 'input'
      },
      {
        default: 'engineering@reactioncommerce.com',
        message: 'Author Email',
        name: 'projectAuthorEmail',
        type: 'input'
      },
      {
        message: 'Keep NPM repository private?',
        name: 'isNPMPrivate',
        type: 'confirm'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const opts = Object.assign({}, this.options, this.props);
    // Package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      opts
    );

    // Project Files
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      opts
    );

    // Docker
    this.fs.copy(this.templatePath('Dockerfile'), this.destinationPath('Dockerfile'));

    this.fs.copyTpl(
      this.templatePath('docker-compose.yml'),
      this.destinationPath('docker-compose.yml'),
      opts
    );

    this.fs.copy(
      this.templatePath('.dockerignore'),
      this.destinationPath('.dockerignore')
    );

    this.fs.copyTpl(
      this.templatePath('.env.example'),
      this.destinationPath('.env.example'),
      opts
    );

    this.fs.copy(this.templatePath('bin'), this.destinationPath('bin'));

    // Git
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
      opts
    );

    // Project Files
    this.fs.copy(this.templatePath('.reaction'), this.destinationPath('.reaction'));
    this.fs.copy(this.templatePath('bin'), this.destinationPath('bin'));
    this.fs.copy(this.templatePath('reports'), this.destinationPath('reports'));
    this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'), opts);
    this.fs.copy(this.templatePath('test'), this.destinationPath('test'));
    this.fs.copy(
      this.templatePath('CODE_OF_CONDUCT.md'),
      this.destinationPath('CODE_OF_CONDUCT.md')
    );
    this.fs.copy(this.templatePath('LICENSE.md'), this.destinationPath('LICENSE.md'));
  }

  install() {
    // Dependencies
    this.yarnInstall([
      'bunyan@^1.8.12',
      'bunyan-format@^0.2.1',
      'envalid@^4.1.2',
      'graphql-yoga@^1.3.2'
    ]);

    // Dev dependencies
    this.yarnInstall(
      [
        '@reactioncommerce/eslint-config@^1.0.1',
        'babel-cli@^6.26.0',
        'babel-eslint@^8.2.1',
        'babel-preset-env@^1.6.1',
        'babel-preset-stage-2@^6.24.1',
        'eslint@^4.17.0',
        'eslint-config-prettier@^2.9.0',
        'eslint-plugin-babel@^4.1.2',
        'eslint-plugin-import@^2.8.0',
        'eslint-plugin-jest@^21.12.1',
        'eslint-plugin-jsx-a11y@^6.0.3',
        'eslint-plugin-prettier@^2.6.0',
        'eslint-plugin-react@^7.6.1',
        'jest@^22.3.0',
        'jest-junit@3.6.0',
        'nodemon@^1.14.12',
        'prettier@1.10.2',
        'prettier-check@^2.0.0',
        'rimraf@^2.6.2',
        'snyk@^1.69'
      ],
      { dev: true }
    );

    this.log('\nCreating .env from .env.example');
    this.spawnCommand('./bin/setup', { stdio: 'ignore' });
    this.log(chalk.bold.green('Created .env'));
  }

  end() {
    this.fs.copy(this.templatePath('.yarnrc'), this.destinationPath('.yarnrc'));

    this.log(chalk.bold.yellow('IMPORTANT:'));
    this.log(
      "Choose 'y' to overwrite node_modules when prompted. " +
        'This will simply delete the node_modules directory that was ' +
        "created during the installation . We'll rebuild the dependencies " +
        'via a Docker build to run the project.\n' +
        "The project may not run properly if you don't choose 'y'."
    );
    this.log('\nUse Docker Compose from here on out.');
    this.fs.delete(this.destinationPath('node_modules'));

    this.log(chalk.bold.green('\nGenerator setup finished.'));
    this.log('If you see no errors above, run the server with Docker Compose:');
    this.log(chalk.bold.white('docker-compose up\n'));
  }
};
