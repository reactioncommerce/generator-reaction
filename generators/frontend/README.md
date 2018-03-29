Steps used to (re)generate the frontend/templates folder:

```bash
npx create-react-app templates
cd templates
rm -rf node_modules
rm yarn.lock
rm README.md
cd src
rm App.css
rm logo.svg
```

Copy in the standard README.md text with template placeholders.

Copy the following into src/App.js:

```js
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        Welcome to the app!
      </div>
    );
  }
}

export default App;
```

Copy the following into src/App.test.js:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
```

Copy the following and paste at the end of .gitignore:

```text
# reaction
!.env.example
.env
!reports/README.md
reports/*
```

Copy the following into docker-compose.yml:

```yaml
version: '3.4'

services:
  web:
    build:
      context: .
      args:
        BUILD_ENV: "development"
    command: [sh, -c, "yarn start"]
    env_file:
      - ./.env
    environment:
      REACTION_APP_NAME: "<%= projectName %>.web"
    ports:
      - 4000:4000
    volumes:
      - $HOME/.cache/yarn-offline-mirror:/home/node/.cache/yarn-offline-mirror
      - web-yarn:/home/node/.cache/yarn
      - .:/usr/local/src/reaction-app

volumes:
  web-yarn:
```

Add necessary template tags to package.json

Add eslint config to package.json:

```json
"eslintConfig": {
  "extends": [
    "@reactioncommerce"
  ]
},
"eslintIgnore": ["build", "reports"]
```

Add jest config to package.json:

```json
"jest": {
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/reports/**",
    "!**/build/**",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
},
```

Add babel config to package.json:

```json
"babel": {
  "plugins": [
    "babel-plugin-styled-components"
  ],
  "presets": [
    "env",
    "stage-2",
    "react"
  ],
  "sourceMaps": true
}
```

In public folder:

- Replace favicon.ico with the Reaction Commerce ico
- Change the title in index.html to `Reaction App`
- Change the `short_name` and `name` in manifest.json to `Reaction App`
