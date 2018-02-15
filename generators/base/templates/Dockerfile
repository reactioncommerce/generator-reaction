FROM node:8-alpine
MAINTAINER Ticean Bennett <ticean@reactioncommerce.com>

ARG BUILD_ENV=production

ENV APP_SOURCE_DIR=/usr/local/src/reaction-app \
    BUILD_ENV=$BUILD_ENV \
    PATH=$PATH:/usr/local/src/node_modules/.bin

WORKDIR $APP_SOURCE_DIR/..
COPY package.json yarn.lock $APP_SOURCE_DIR/../

# Build the dependencies into the Docker image in a cacheable way. Dependencies
# are only rebuilt when package.json or yarn.lock is modified.
#
# The project directory will be mounted during development. Therefore, we'll
# install dependencies into an external directory (one level up.) This works
# because Node traverses up the fs to find node_modules.
RUN set -ex; \
  if [ "$BUILD_ENV" = "production" ]; then \
    yarn install \
      --frozen-lockfile \
      --ignore-scripts \
      --no-cache \
      --production; \
  elif [ "$BUILD_ENV" = "test" ]; then \
    yarn install \
      --frozen-lockfile \
      --ignore-scripts \
      --no-cache; \
  elif [ "$BUILD_ENV" = "development" ]; then \
    yarn install \
      --cache-folder /home/node/.cache/yarn \
      --ignore-scripts; \
  fi; \
  rm package.json yarn.lock

WORKDIR $APP_SOURCE_DIR
COPY . $APP_SOURCE_DIR

RUN yarn run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
