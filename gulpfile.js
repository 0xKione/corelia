'use strict';

// Dependencies
////////////////////////////////////////////////////////////////////////////////
var gulp = require('gulp');

var argv = require('yargs').argv;
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var bundler = require('aurelia-bundler');
var changedInPlace = require('gulp-changed-in-place');
var concat = require('gulp-concat');
var del = require('del');
var jsmin = require('gulp-uglify');
var eslint = require('gulp-eslint');
var gulpIf = require('gulp-if');
var htmlMin = require('gulp-htmlmin');
var merge = require('merge-stream');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var vinylPaths = require('vinyl-paths');
var watch = require('gulp-watch');

// Filepath Variables
////////////////////////////////////////////////////////////////////////////////
var clientRoot = './client/';
var serverRoot = './server/';
var jspmRoot = './client/jspm_packages/';

var clientBundles = clientRoot + 'bundles/';
var clientTemp = clientRoot + 'dist/';
var clientOut = clientRoot + 'www/';

var watchedFiles = [
  clientRoot + 'index.html', 
  clientRoot + 'src/*.js', 
  clientRoot + 'src/**/*.js', 
  clientRoot + 'src/*.html', 
  clientRoot + 'src/**/*.html', 
  clientRoot + 'src/assets/sass/*.scss'
];

var fontFiles = [
  jspmRoot + 'github/twbs/bootstrap*/fonts/*',
  jspmRoot + 'npm/font-awesome*/fonts/*'
]

// Configuration Variables
////////////////////////////////////////////////////////////////////////////////
var bundleConfig = {
  force: true,
  baseURL: './client/',
  configPath: './client/config.js',
  packagePath: '.',
  bundles: {
    "bundles/app-bundle": {
      includes: [
        'dist/**/*.js',
        'dist/**/*.html!text',
        'dist/css/*',
        'dist/**/*.json'
      ],
      options: {
        inject: true,
        minify: false
      }
    },
    "bundles/vendor-bundle": {
      includes: [
        'aurelia-bootstrapper',
        'aurelia-fetch-client',
        'aurelia-router',
        'aurelia-animator-css',
        'aurelia-templating-binding',
        'aurelia-templating-resources',
        'aurelia-templating-router',
        'aurelia-loader-default',
        'aurelia-history-browser',
        'aurelia-logging-console',
        'aurelia-i18n',
        'aurelia-auth',
        'i18next-xhr-backend',
        'bootstrap',
        'bootstrap/css/bootstrap.css',
        'font-awesome/css/font-awesome.css'
      ],
      options: {
        inject: true,
        minify: true
      }
    }
  }
};

// Private Tasks
////////////////////////////////////////////////////////////////////////////////
gulp.task('clean', function() {
  return gulp.src([clientOut, clientTemp, clientBundles, clientRoot + 'src/services/*.js', '!' + clientRoot + 'src/services/base-service.js'])
    .pipe(vinylPaths(del));
});

gulp.task('sass', function() {
  return gulp.src([clientRoot + 'src/assets/sass/*.scss', clientRoot + 'src/assets/sass/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(clientTemp + 'css/'));
});

gulp.task('html', function() {
  return gulp.src([clientRoot + 'src/*.html', clientRoot + 'src/**/*.html'])
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest(clientTemp));
});

gulp.task('lint', function() {
  return gulp.src([clientRoot + 'src/*.js', clientRoot + 'src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('services', function() {
  return gulp.src(argv.mock ? clientRoot + 'src/services/mock/*.js' : clientRoot + 'src/services/real/*.js')
    .pipe(gulp.dest(clientRoot + 'src/services/'));
});

gulp.task('transpile', function() {
  return gulp.src([clientRoot + 'src/*.js', clientRoot + 'src/**/*.js', '!' + clientRoot + 'src/services/mock/*.js', '!' + clientRoot + 'src/services/real/*.js'])
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(sourceMaps.init())
    .pipe(babel({ 'plugins': [ 'transform-es2015-modules-systemjs' ] }))
    .pipe(gulp.dest(clientTemp));
});

gulp.task('move', function() {
  var index = gulp.src([clientRoot + 'index.html', clientRoot + 'jsconfig.json', clientRoot + 'config.js', clientRoot + 'config.xml', clientRoot + 'favicon.ico'])
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulp.dest(clientOut));

  var jspm = gulp.src(clientRoot + 'jspm_packages/**/*')
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulp.dest(clientOut + 'jspm_packages/'));

  var bundles = gulp.src(clientRoot + 'bundles/**/*')
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulp.dest(clientOut + 'bundles/'));

  var images = gulp.src(clientRoot + 'src/assets/images/**/*')
    .pipe(gulp.dest(clientOut + 'images/'));

  var fonts = gulp.src(fontFiles)
    .pipe(gulp.dest(clientOut + 'fonts/'));

  var locales = gulp.src(clientRoot + 'src/locales/**/*.json')
    .pipe(gulp.dest(clientOut + 'locales'));

  return merge(index, jspm, bundles, images, fonts);
});

gulp.task('bundle', function() {
  return bundler.bundle(bundleConfig);
});

gulp.task('unbundle', function() {
  return bundler.unbundle(bundleConfig);
})

gulp.task('reload-client', ['build'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('reload-server', ['default'], function(callback) {
  var callbackTriggered = false;
  return nodemon({ script: serverRoot + 'main.js' }).on('start', function() {
    if (!callbackTriggered) {
      callbackTriggered = true;
      callback();
    }
  });
});

// Public Tasks
////////////////////////////////////////////////////////////////////////////////
gulp.task('dev', ['reload-server'], function() {
  // Deploy a Browser Sync server
  browserSync.init(null, {
    proxy: 'http://localhost:8080'
  });

  // Watch for changes
  gulp.watch(watchedFiles, ['reload-client']);
});

gulp.task('build', function(callback) {
  return runSequence(
    ['lint', 'sass', 'html'],
    'services',
    'transpile',
    'bundle',
    'move',
    callback
  );
});

gulp.task('default', function(callback) {
  return runSequence(
    'clean',
    'build',
    callback
  );
});

gulp.task('production', function(callback) {
  return runSequence(
    'clean',
    'sass',
    ['minify-js', 'minify-css'],
    callback
  );
});