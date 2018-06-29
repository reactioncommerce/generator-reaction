# generator-reaction [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> &#34;Yeoman generator for Reaction NEXT JavaScript services.&#34;

## Installation

First, install [Yeoman](http://yeoman.io) and generator-reaction using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-reaction
```

### NPM Link

This generator is not yet published to NPM. You will need to run `npm link` to
make the template available.

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

## License

GPL-3.0 © [Ticean Bennett](https://reactioncommerce.com)

[npm-image]: https://badge.fury.io/js/generator-reaction-next.svg
[npm-url]: https://npmjs.org/package/generator-reaction-next
[travis-image]: https://travis-ci.org/reactioncommerce/generator-reaction-next.svg?branch=master
[travis-url]: https://travis-ci.org/reactioncommerce/generator-reaction-next
[daviddm-image]: https://david-dm.org/reactioncommerce/generator-reaction-next.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/reactioncommerce/generator-reaction-next
