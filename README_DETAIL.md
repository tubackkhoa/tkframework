## Table of contents

  1. [Basic Rules](#basic-rules)
  1. [Overview](#overview)
  1. [Main dependencies](#main-dependencies)
  1. [Framework Structure](#framework-structure)
  1. [Code convention](CODE_CONVENTION.md)
  1. [Migrate Database](#database-migrations)
  1. [Installing and Configuring Servers](SERVER.md)
  1. [Setup project on Windows OS](SetupAndRunProjectOnWindow.md)
  1. [Versioning](#versioning)
  1. [Tutorials](TUTORIAL.md)
  1. [Setup on Ubuntu VPS](#setup-ubuntu)

## Tutorial

  1. [Intro](#intro)
  1. [Setup](#setup)
  1. [Simple React](#simple-react)
  1. [Advanced React](#advanced-react)
  1. [Testing and Optimizing](#testing-and-optimizing)
  1. [Deploying](#deploying-react)
  1. [Example](#tutorial-example)
  1. [Tutorial Mobile](#tutorial-mobile)

## Basic Rules
--------------

**[⬆ back to top](#table-of-contents)**

The purpose of this framework is to show how to set up a concise [React](https://facebook.github.io/react) app aimed at rapid development and sophisticated asynchronic processing. The actual application code is written using [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0), [JSX](https://facebook.github.io/jsx/), and [not-yet-standardized JavaScript](https://github.com/tc39/proposals) syntax. As of 10/2016, modern browsers (excluding IE11 and older, naturally) [implement more than 90% of ES6 specification](https://kangax.github.io/compat-table/es6), and therefore it is no more absolutely necessary to transpile ES6 into ES5, unless support for obsolete browsers is required. In such case, [Babel preset for ES6->ES5 transpilation](http://babeljs.io/docs/plugins/preset-es2015) can be used.
For more detail, please go to this [React Ecosystem and Tutorials](TUTORIAL.md)

## Overview
-----------------

**[⬆ back to top](#table-of-contents)**

![React-redux-saga Diagram](docs/TKFramework.png)
![React-relay-graphql Diagram](docs/TKFramework2.png)
![Code sharing Diagram](docs/TKFramework3.png)

## Main dependencies
-----------------

**[⬆ back to top](#table-of-contents)**

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

## Framework Structure
----------------------

**[⬆ back to top](#table-of-contents)**

```
root
├── client
├── mobile
└── server
```
1. [Client](#folder-structure-for-single-page-application) (single page application)
1. [Mobile](#folder-structure-for-mobile-application) (mobile application)

## Folder structure for single page application

```
client
.
├── store
|   ├── action
│   │   ├── *.jsx
│   │   └── common.jsx   ()
|   ├── api
│   │   ├── *.jsx
│   │   └── index.jsx    (include modules)
|   ├── reducer
│   │   ├── *.jsx
│   │   └── index.jsx    (include modules)
|   ├── saga
│   │   ├── *.jsx
│   │   └── index.jsx    (include modules)
|   └── selector
│       └── *.jsx
|
├── stylesheets
|   ├── base (include mixins, reset css)
|   ├── components (stylesheet of all components should be placed here)
|   └── all.scss
|
└── ui
    ├── backend
    │   ├── components
    |   └── base
    ├── frontend
    │   ├── components
    |   └── base
    ├── shared
    ├── root.jsx
    └── routes.jsx
```

## Folder structure for Mobile application

```
mobile/project-name
.
├── android (All of the native Android code, open with Android Studio)
|
├── ios (Native iOS code, open with Xcode)
|
├── store
|   ├── action
│   │   ├── *.jsx
│   │   └── common.jsx
|   ├── api
│   │   ├── *.jsx
│   │   └── index.jsx    (include modules)
|   ├── reducer
│   │   ├── *.jsx
│   │   └── index.jsx    (include modules)
|   ├── saga
│   │   ├── *.jsx
│   │   └── index.jsx    (include modules)
|   └── selector
│       └── *.jsx
├── ui
|   ├── container (include screen/page of application)
|   └── components (include all components need for project)
|
├── package.json (scripts, dependencies, and other configurations for React Native project)
└── index.*.js (entry point for iOS app or Android app into the React Native)
```

## Database Migrations
-------------------

**[⬆ back to top](#table-of-contents)**

## Set connection to your server

Find `server/config/database.js` and config your default connection variables.

```
username: `root`
password: `123456`
database: `tkframework`
host: `localhost (127.0.0.1)`
```

If you don't want to use default connection, you need to set `DB_PASS` and `DB_SERVER` env value before run server

For example, we connect to our remote Mysql server `192.168.0.34` as DB_SERVER

```
DB_SERVER=192.168.0.34 npm run server
```

## Scaffolding database using Migrate script

First of all, we will create database schema file in folder `server/models/tables` and save as your table name, e.g: `test.js`

```js
// import dataloaderSequelize from 'data/loader/sequelize'
import { sequelize, DataTypes } from 'models/config'

const test = sequelize.define("test", {      
  id          : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true },
  name: DataTypes.STRING, 
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',  
})


// dataloaderSequelize(test)

export default test
```

Then create migrate script in `build/db/migrate`

```js
import models from 'models'

// Create the tables:
models.test.sync()

// insert data
for (var i=1;i<=20;i++) {
  models.test.create({  
    name: `Test ${i}`,  
  })
}
```
Save as `<version-number>.js`

Migrate to DB

Edit your file `package.json`, find and change `SQL_VERSION` to migrate version,

then,

```
$ NODE_ENV=server npm run db:migrate
```



## Versioning

# Build version naming convention
### Major.MinorStage.Revision (Example: 0.2rc.6472f6f7)
1.  Major: instalment; increase then Minor reset to zero: 
2.  Minor: iteration (sprint, milstone or demo ...): JRSS use sprint for this
3.  Stage:
    - d for developer (status)
    - a for alpha (status)
    - b for beta (status)
    - rc for release candidate
    -  (none) for (final) release
4.  Revision: changeset of source code version control

## Update to release note file
1.  Date, version name
2.  Release note
3.  Known issues
4.  Change history

### Build step by step
1.  Merge souce code from develop branch to master branch. We have a revision commit
2.  Tag version on master branch
3.  Run build from Jenkins or build script
4.  Verify main flow
5.  Update release note


## Setup Ubuntu
Setup TKframework on VPS Ubuntu (16.04)

**[⬆ back to top](#table-of-contents)**

## Login VPS using pem files
Before login you have to chmod your file
```
chmod 400 <path_to_pem_file>/file.pem
```
Login into VPS using pem files

```sh
ssh -i <path_to_pem_file>/file.pem `user`@`VPS_ip`
```

## Install mysql
```sh
sudo apt-get update
sudo apt-get install mysql-server
```
You'll be prompted to create a root password during the installation. Choose a secure one and make sure you remember it

User: `root`

Password: `123456`

### Check service status:
```sh
systemctl status mysql.service
```
### Configuring MySQL
```sh
sudo mysql_secure_installation
```
### Enable Remote access
 Uncommented in `/etc/mysql/my.cnf` (mysql 5.6 and below) or  `/etc/mysql/mysql.conf.d/mysqld.cnf` (mysql 5.7 and above) and assigned to your computers IP address and not loopback

Replace xxx with your IP Address
```sh
bind-address        = xxx.xxx.xxx.xxx
```
Or add a `bind-address      = 0.0.0.0` if you don't want to specify the IP
Restart mysql service
```sh
sudo service mysql restart
```
For a remote user to connect with the correct priveleges you need to have that user created in both the localhost and '%' as in.

```sh
mysql -uroot -p
mysql> CREATE USER 'root'@'%' IDENTIFIED BY '123456';
```
('123456' as password)

then,
```sh
mysql> GRANT ALL ON *.* TO 'root'@'localhost';
mysql> GRANT ALL ON *.* TO 'root'@'%';
```
and finally,

```sh
mysql> FLUSH PRIVILEGES;
mysql> EXIT;
```

### Import sample database
Database can get from `<TKframework dir>/scripts/tkframework.sql`

On VPS 
```sh
mysql -u username -p tkframework < tkframework.sql
```

## Install Node.js and Expressjs (optional)
```sh
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```



## Tutorial Intro 

**[⬆ back to top](#table-of-contents)**


1. What is React and why you should learn it?
see [React](https://facebook.github.io/react/)

> React is just a javascript library for building user interfaces. You should learn it because Facebook did it, and so did Baidu...
It is also easier to learn and has better performance than other frameworks. And you can feel the surprising trend of it, everybody is talking about it. And React Ecosystem is a perfect solution for building all kinds of apps in pure javascript language.

## Setup
1. Choosing Code editor (Sublime Text 3)
1. Installing Node.js and npm (node 7)
1. Setting up Webpack and Babel (webpack 2.0, ES 2015, ES7, JSX).
1. Setting up environment (hot reload, production and development)
1. Setting up Express as server, GraphQL as query language for your API, Chrome as browser. 
1. React Native CLI Installation and ensure simulator is installed

## Simple React
1. Learning JSX with HelloWorld React.
1. Component props, events, callback and lifecycle.
1. Nested Components and containers, styling.
1. React-router for Page routing.
1. Building simple static website like portfolio.

## Advanced React
1. Redux - Predictable state container for better managing  component state 
1. Redux-form - manage your form state in Redux (validation, model submission)
1. Relay - for building data-driven from GraphQL API with consistency, optimistic updates, and error handling 
1. Redux-saga - make side effects easier and better without callback, especially for asynchronous things like data fetching and impure things like accessing the browser cache, work well with redux-persist.
1. Building a simple CMS.

## Testing and Optimizing React
1.  Tape - for writing unit tests with better readability and less code.
1. Sharing code between mobile, web, and server for less maintenance, including store, components, and utils folders (less code, easier to optimize code)
1. Review carefully each **shouldComponentUpdate** method.
1. UglifyJS2 - library for optimizing javascript code (web, mobile, server), used in production mode

## Deploying React
1. Using **rsync** and **sshpass** for autonomous deploy via command scripts.
1. Using Xcode and Android Studio to build your react-native apps.
2. Using codepush service to update javascript logic to your apps instantly.


## Building the list of shippers using redux, sagas

[..Back](../README.md)

Tutorial
  1. Create action requestors and action creators(#create-action-requestors-and-action-creators)
  1.1 Define action requestors
  1.2 Define action creators
  2. Using Sagas for handling async operations(#using-sagas-for-handling-async-operations)
  3. Render components(#render-components)

## Create action requestors and action creators
We are going to learn how to get shippers list from database using redux.
First of all you have to create action request to Sagas.

`Action` returns a formatted object of the action type and optional payload which is then dispatched to the store.

### Define action requestors
`action\shipper.js`

```
//action requestors
export const getShippers = (...args) => ({
  type: 'app/getShippers',
  args
})

export const getShipper = (...args) => ({
  type: 'app/getShipper',
  args
})
```

### Define action creators
`Action creators` are functions that return plain Javascript object of `action type` and an optional `payload`. So action creators create actions that are dispatched to the `store`. They are just pure functions.

Let’s first define our action types in a file and export them.

`action\shipper.js`

```
//action creators
export const replaceShippers = (data) => ({
  type: 'app/replaceShippers',
  payload: data,
})

export const replaceShipper = (data) => ({
  type: 'app/replaceShipper',
  payload: data,
})
```

The optional arguments in the action creators `payload` are passed at the site of call/dispatch.

## Using Sagas for handling async operations
Before doing some Saga stuff, we'll define `Api` in a file inside `api` folder and export them for ease of use later.

`api\shipper.js`

```
import { fetchJson } from 'store/api/common'
export default {
  getShippers() {
    return fetchJson(`/api/shipper`)
  },

  getShipper(id) {
    return fetchJson(`/api/shipper/index/${id}`)
  },
}
```
In this tutorial, our app just need to load simple api without token. So we use `fetchJson` function here.

> some api common functions:
> fetchJson: get json from restful api link
> fetchJsonWithToken: include token when we're fetching the api

Please don't forget to register api with it's root
`api\index.js`
```
import shipper from './shipper'

export default {
  shipper,
}

```
Let's move to store\sagas folder then create a new file, name it `shipper.js`

`sagas\shipper.js`

```
import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'
import { replaceShippers, replaceShipper } from 'store/actions/shipper'
import { createRequestSaga } from 'store/sagas/common'

import { setToast, log } from 'store/actions/common'

const requestGetShippersAsync = createRequestSaga({
  request: api.shipper.getShippers,
  key: 'getShippers',
  success: [
    (data) => replaceShippers(data),
  ],
})

const requestGetShipperAsync = createRequestSaga({
  request: api.shipper.getShipper,
  key: 'getShipper',
  success: [
   (data) => replaceShipper(data),
  ],
})

const asyncShipperFetchWatchers = [
  function* asyncShipperFetchWatcher() {
    yield [
      takeLatest('app/getShipper', requestGetShipperAsync),
      takeLatest('app/getShippers', requestGetShippersAsync),
    ]
  },
]

export default asyncShipperFetchWatchers
```

As you see two key here 'getShipper' and 'getShippers' are action requestors type we defined in part 1, and replaceShippers & replaceShipper are two action creators.

Let’s wrap up this section by registering our saga to the rootSaga. 

`sagas\index.js`

```
import { fork } from 'redux-saga/effects'
import asyncShipperFetchWatchers from './shipper'

// saga must be a function like generator of other functions
const rootSaga = function* () {
  yield [   
    // we can use single generator, but we should use a collection for later usage
    ...asyncShipperFetchWatchers.map(watcher => fork(watcher)),
  ]
}

export default rootSaga
```

## Setup state management system
We have defined the action creators we need and it's time to connect them together. We will setup our reducers and configure our store in this step.

> Reducers, for short are pure functions that accept the state tree

> and an action object from the store and returns a new state. 

> No state mutation. No API calls. No side effects.

> It simply calculates the new state and returns it to the store.

Let’s wire up our reducers by first setting our initial state. We want to initialize shippers list as an empty array and current open shipper as an empty object in our own case.

`reducers\store.js`
```
const initialState = {
  shipper: {},
  shippers: [],
  order: {},
  orders: [],
}

```

Our reducers take the current state tree and an action object and then evaluate and return the outcome.

`reducers\store.js`

```
export const storeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // call action

    case 'app/replaceShipper':
      return { ...state, shipper: payload }

    case 'app/replaceShippers':
      return { ...state, shippers: payload }

    default:
      return state
  }

}
```

The next step connect store.js to work with root reducers

`reducers\index.js`

```
import { combineReducers } from 'redux'
import {storeReducer as store} from './store'

// a rootReducer is like a single state, key is function return a sub state value
const rootReducer = combineReducers({
  store,
})

export default rootReducer
```
You would remember reducers are pure functions and don’t handle side effects or async tasks; this is where redux-saga comes in handy.

## Render components
Ok, now we spend more time together. The most important part, render to the view!

`React-redux` exposes two important methods(components) we will use to bind our redux store to our component - `connect` and `Provider`.

`connect` takes three optional functions. If any is not defined, it takes the default implementation. It’s a function that returns a function that takes our React component-MediaGalleryPage as an argument.

mapStateToProps allows us keep in sync with store's updates and to format our state values before passing as props to the React component. We use ES6 destructuring assignment to extract images and videos from the store’s state.



## Tutorial mobile
Initialization your project 

```
<tkframework>$ cd mobile
mobile$ react-native init <project-name>
```

Build android files for the first time you install

```
$ cd <project-name>
<project-name>$ react-native run-android
```

Install Redux dependencies

```
<project-name>$ npm install react-redux redux redux-persist redux-logger redux-saga --save
```

Install GraphQL and Replay if you want to use Replay in your project

```
<project-name>$ npm install react-relay babel-relay-plugin --save
```

Install UI Kit (we use Material Ui for React Native)
```
<project-name>$ npm install react-native-material-ui react-native-vector-icons --save
```