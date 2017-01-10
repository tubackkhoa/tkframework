Initialization your project 

[..Back](../README.md)

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