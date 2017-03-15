# Frontend

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

[![Build Status](https://travis-ci.org/Packebian/Frontend.svg?branch=master)](https://travis-ci.org/Packebian/Frontend)

## env.sh
The file env.sh contains environment variables used to setup the envrionment.
```sh
API_URL="http://192.168.99.100:1337" # URL Path to the Packebian API (https://github.com/Packebian/Backend-controller)
```

## Prepare application
Install dependencies and update the $PATH
```sh
$ npm install
$ source env.sh
$ bower install
```

## Build & development
Grunt tasks can build and serve the app
```sh
$ grunt
$ grunt serve
```


## Testing
Karma tests are run with grunt
```
$ grunt test
```
