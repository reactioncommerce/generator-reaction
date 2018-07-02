# generator-reaction

[![NPM version][npm-image]][npm-url] [![CircleCI](https://circleci.com/gh/reactioncommerce/generator-reaction.svg?style=svg)](https://circleci.com/gh/reactioncommerce/generator-reaction)

This is a [Yeoman](http://yeoman.io) generator plugin used by [Reaction Commerce](https://www.reactioncommerce.com/) developers. The main generator creates a new project. There are also subgenerators for creating a new NPM package project and for quickly adding GraphQL files to the main Reaction project.

## Installation

First, globally install [Yeoman](http://yeoman.io) and generator-reaction using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-reaction
```

### NPM Link

If you are adding or modifying generators in this package, you can test them prior to publishing by running `npm link` in the generator project's root directory to make the template available globally on your system.

```bash
npm link
```

## Generate a new frontend or backend Node project

```bash
mkdir project-name
cd project-name
yo reaction
```

## Generate a new NPM package project

```bash
mkdir package-name
cd package-name
yo reaction:npm
```

## Generate GraphQL files in the main Reaction app

```bash
yo reaction:graphql
```

## Getting To Know Yeoman

* Yeoman has a heart of gold.
* Yeoman is a person with feelings and opinions, but is very easy to work with.
* Yeoman can be too opinionated at times but is easily convinced not to be.
* Feel free to [learn more about Yeoman](http://yeoman.io/).

## Commit Messages

To ensure that all contributors follow the correct message convention, each time you commit your message will be validated with the [commitlint](https://www.npmjs.com/package/@commitlint/cli) package, enabled by the [husky](https://www.npmjs.com/package/husky) Git hooks manager.

Examples of commit messages: https://github.com/semantic-release/semantic-release

## Publication to NPM

The `generator-reaction` package is automatically published by CI when commits are merged or pushed to the `master` branch. This is done using [semantic-release](https://www.npmjs.com/package/semantic-release), which also determines version bumps based on conventional Git commit messages.

## License

GPL-3.0 © [Reaction Commerce, Inc.](https://reactioncommerce.com)

[npm-image]: https://badge.fury.io/js/generator-reaction.svg
[npm-url]: https://npmjs.org/package/generator-reaction
