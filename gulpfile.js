'use strict';

var gulp = require('gulp');

var assign = Object.assign || require('object.assign');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var cssmin = require('gulp-clean-css');
var del = require('del');
var jsmin = require('gulp-uglify');
var lint = require('gulp-eslint');
var merge = require('merge-stream');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var vinylPaths = require('vinyl-paths');
var watch = require('gulp-watch');

var clientRoot = './client/';
var serverRoot = './server/';

var watchedFiles = [
  clientRoot + 'index.html', 
  clientRoot + 'src/*.js', 
  clientRoot + 'src/**/*.js', 
  clientRoot + 'src/*.html', 
  clientRoot + 'src/**/*.html', 
  clientRoot + 'src/assets/sass/*.scss'
];

gulp.task('clean', function() {
  return gulp.src(clientRoot + 'www/')
    .pipe(vinylPaths(del));
});

gulp.task('build', function() {
  var index = gulp.src([clientRoot + 'index.html', clientRoot + 'jsconfig.json', clientRoot + 'src/.gitkeep'])
    .pipe(gulp.dest(clientRoot + 'www/'));

  var files = gulp.src(clientRoot + 'src/**/*')
    .pipe(gulp.dest(clientRoot + 'www/files/'));

  var scripts = gulp.src(clientRoot + 'scripts/**/*')
    .pipe(gulp.dest(clientRoot + 'www/scripts/'));

  return merge(index, files, scripts);
});

gulp.task('lint', function() {
  // Needed?
  console.log('lint');
});

gulp.task('sass', function() {
  // return gulp.src(clientRoot + 'src/assets/sass')
  //   .pipe(sass().on('error', sass.logError))
  //   .pipe(rename('styles.css'))
  //   .pipe(gulp.dest(clientRoot + 'www/css'));
  console.log('sass');
});

gulp.task('minify-js', function() {
  // Needed?
  console.log('minify-js');
});

gulp.task('minify-css', function() {
  // Needed?
  console.log('minify-css');
});

gulp.task('reload-client', ['default'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('reload-server', function(callback) {
  var callbackTriggered = false;
  return nodemon({ script: serverRoot + 'main.js' }).on('start', function() {
    if (!callbackTriggered) {
      callbackTriggered = true;
      callback();
    }
  });
});

gulp.task('dev', ['reload-server', 'default'], function() {
  // Deploy a Browser Sync server
  browserSync.init(null, {
    proxy: 'http://localhost:8080'
  });

  // Watch for changes
  gulp.watch(watchedFiles, ['reload-client']);
});

gulp.task('default',function(callback) {
  return runSequence(
    'clean',
    'sass',
    'lint',
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