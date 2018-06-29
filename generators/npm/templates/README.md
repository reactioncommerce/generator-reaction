# <%= packageName %>

![npm (scoped)](https://img.shields.io/npm/v/<%= packageName %>.svg)
 [![CircleCI](https://circleci.com/gh/reactioncommerce/<%= repoName %>.svg?style=svg)](https://circleci.com/gh/reactioncommerce/<%= repoName %>)

<%= packageDescription %>

## Install

```sh
npm install <%= packageName %>
```

## Usage

TODO

## Commit Messages

To ensure that all contributors follow the correct message convention, each time you commit your message will be validated with the [commitlint](https://www.npmjs.com/package/@commitlint/cli) package, enabled by the [husky](https://www.npmjs.com/package/husky) Git hooks manager.

Examples of commit messages: https://github.com/semantic-release/semantic-release

## Publication to NPM

The `<%= packageName %>` package is automatically published by CI when commits are merged or pushed to the `master` branch. This is done using [semantic-release](https://www.npmjs.com/package/semantic-release), which also determines version bumps based on conventional Git commit messages.

## License

Copyright © [GNU General Public License v3.0](./LICENSE)
