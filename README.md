# Corelia
A project to create a MEAN stack application replacing Angular with Aurelia and using Cordova

## Latest Version
1.1.0

## Setting up Environment

### Install Global Dependencies
Install [Node.js](https://nodejs.org)
```sh
# Install Gulp globally (use 'sudo' if permission denied)
$ npm install -g gulp

# Install Cordova globally (use 'sudo' if permission denied)
$ npm install -g cordova

# Install http-server globally (use 'sudo' if permission denied)
$ npm install -g http-server
```

### Install Local Dependencies
```sh
$ cd path/to/repo
$ npm install
$ jspm install
$ bower install
$ gulp
```

### Install Cordova Platforms
#### Android
Follow the [Android Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#requirements-and-support)
(Make sure to use JDK 1.8)
```sh
$ cd path/to/repo
$ cd client
$ cordova platform add android --save
```

#### iOS
Follow the [iOS Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html#requirements-and-support)
```sh
$ cd path/to/repo
$ cd client
$ cordova platform add ios --save
```

## Running Project
### Web
```sh
$ cd path/to/repo
$ gulp dev          // Run with real back-end
$ gulp dev --mock   // Run with fake back-end
```

### Android
```sh
$ cd path/to/repo
$ gulp

# Verify platform requirements are met
$ cordova requirements
$ cordova build android
$ cordova emulate android
```

### iOS
```sh
$ cd path/to/repo
$ gulp

# Verify platform requirements are met
$ cordova requirements
$ cordova build ios
$ cordova emulate ios
```

## Status
This project was meant to be a starting place for people who want to use Aurelia with Cordova in a MEAN stack environment. I am currently working on adding functionality to build a basic back-end to the project while also expanding the Gulp tasks to make the deployment simpler.

## License
MIT
