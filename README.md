React + Redux + Saga + Relay + GraphQL + Express + Sequelize + Material-UI + Webpack + Babel example with hot reloading and routing
===========================================================================================
The purpose of this framework is to show how to set up a concise [React](https://facebook.github.io/react) app aimed at rapid development and sophisticated asynchronic processing. The actual application code is written using [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0), [JSX](https://facebook.github.io/jsx/), and [not-yet-standardized JavaScript](https://github.com/tc39/proposals) syntax. As of 10/2016, modern browsers (excluding IE11 and older, naturally) [implement more than 90% of ES6 specification](https://kangax.github.io/compat-table/es6), and therefore it is no more absolutely necessary to transpile ES6 into ES5, unless support for obsolete browsers is required. In such case, [Babel preset for ES6->ES5 transpilation](http://babeljs.io/docs/plugins/preset-es2015) can be used.
For more detail, please go to this [React Ecosystem and Tutorials](TUTORIAL.md)

TKFramework overview
-----------------
![React-redux-saga Diagram](docs/TKFramework.png)
![React-relay-graphql Diagram](docs/TKFramework2.png)
![Code sharing Diagram](docs/TKFramework3.png)

Main dependencies
-----------------
- [babel](https://github.com/babel/babel) for transpiling next-generation JavaScript and JSX into JavaScript supported by current browsers
- [react-hot-loader](https://github.com/gaearon/react-hot-loader) for hot-reloading a React app
- [react-router](https://github.com/reactjs/react-router) for routing
- [redux](https://github.com/reactjs/redux) for managing application state predictably
- [react-redux](https://github.com/reactjs/react-redux) for integrating Redux into React
- [react-router-redux](https://github.com/reactjs/react-router-redux) for managing router state via Redux
- [redux-saga](https://github.com/yelouafi/redux-saga) for sophisticated asynchronic processing
- [redux-persist](https://github.com/rt2zz/redux-persist) for persist and rehydrate a redux store
- [redux-form](https://github.com/erikras/redux-form) for keeping form state in a redux store
- [react-native](https://github.com/facebook/react-native) for building native apps with React
- [webpack](https://github.com/webpack/webpack) for bundling the code and providing a development server supporting HMR (*hot module replacement*, a.k.a. *hot module reloading*, *hot loading*, and *hot reloading*)

In development mode, the code is automatically transpiled by Babel and hot-loaded to the browser by react-hot-loader plugin utilizing [Webpack's HMR feature](https://webpack.github.io/docs/hot-module-replacement.html). With HMR, the changes made to the source files are reflected automatically on the browser *without page reload*. Page reload resets application state whereas hot reload preserves the state and only updates the changed part of the application. For further information on HMR, see [Webpack’s HMR & React-Hot-Loader — The Missing Manual](https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96).
Both server, web, mobile source code are written in Babel, and sharing some common frameworks.

Requirements
------------
- Node.js

Usage
-----
### Setup
- Install the dependencies: *npm install*
- Go to mobile/ReactNotes then run *npm install* again to setup development environment for mobile
- You may run script from server/data/db/schema.js or import scripts/tkframework.sql using phpmyadmin
- Run *echo "sdk.dir=$ANDROID_HOME" > android/local.properties* to setup android environment
- Run *rnpm install module* to install and linke a module
- Run *rnpm unlink module* to unlink a module

### Development
- Run Webpack development server: *npm start*
- Run Server development server: *npm run server*
- Point your browser to the server (e.g. http://localhost:7000) and begin development at ./src
- There are also browser extensions, such as [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) and [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ja), which can significantly boost React app development

### Production
- Create minified bundle: *npm run bundle*
- Serve ./public with your production server of choice
- Run *sshpass -p "password" npm run deploy* to deploy on server
- Run *sshpass -p "password" npm run server-deploy* to deploy server code
- Run *sshpass -p "password" npm run client-deploy* to deploy website code
- Run *npm run build:ios* to bundle react-native code in **ReactNotes** folder
- Run *PORT=80 DB_PASS=123456 forever -w start index.js* to keep server running and restarting on changes
- Run *node-inspector & npm run server* if node does not support --inspect
