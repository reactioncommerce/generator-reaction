<%= projectName %>

<%= projectDescription %>

[![CircleCI](https://circleci.com/gh/reactioncommerce/<%= projectName %>.svg?style=svg)](https://circleci.com/gh/reactioncommerce/<%= projectName %>)

## Getting Started

```sh
# Clone
git clone git@github.com:reactioncommerce/<%= projectName %>.git

cd <%= projectName %>

# Setup - puts an .env in place
bin/setup

# Start
docker-compose up
```

## Tooling

### Yarn

We have chosen Yarn because it provides advanced features over NPM.

* Ability to freeze the `yarn.lock` for safety in CI and production.
* Ability to set `--modules-folder` for cacheability in Docker images.
* Yarn cache and offline mirror for faster development cycles.

### Docker Compose

Development should be done in Docker Compose. The project directory is mounted
into the Docker container at runtime so that files may be edited from the host
machine. This means that you can choose any editor you'd like and work in a
comfortable development environment. But, be sure to run all tooling commands
with Docker Compose!

#### Running Commands

`docker-compose run --rm web [...]` will run any command inside a Docker
container and then remove the container. Use this to run any tooling
operations. Remember your project directory will be mounted and things will
usually just work.

##### Basic Docker Compose Commands

###### Build

```sh
docker-compose build
```

###### Run the Project

```sh
docker-compose up
```

Or, optionally:

```sh
docker-compose up -d && docker-compose logs -f
```

###### Cleanup

Stop, and retain containers:

```sh
docker-compose stop
```

Stop, and remove containers:

```sh
docker-compose down
```

Stop, and remove containers, volumes and built images:

```sh
docker-compose down -v --rmi local
```

###### Chaining Commands

Commands can be chained for quick execution and selection in shell history.

For example, here's a selective restart of the `web` service into a new
container. This would be useful if you were to modify the service in
`docker-compose.yml`.

```sh
docker-compose stop web \
  && docker-compose rm -f web \
  && docker-compose up -d  web \
  && docker-compose logs -f web
```

##### Yarn Commands

Yarn & NPM should especially run inside the Docker container. We've taken steps
to ensure that the `node_modules` are placed into a cacheable location. If you
run Yarn locally, the `node_modules` are written directly to the project
directory and take precedence over those from the Docker build.

###### Yarn Add

```sh
docker-compose run --rm web yarn add --dev eslint
```

###### Yarn Install

:warning: Always rebuild the image and start a new container after modifying
`yarn.lock` or `Dockerfile`!

```sh
docker-compose run --rm web yarn install
docker-compose down --rmi local
docker-compose build
docker-compose up
```

## License

Copyright © [GNU General Public License v3.0](./LICENSE.md)
