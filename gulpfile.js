'use strict';

var gulp = require('gulp');

var assign = Object.assign || require('object.assign')
var concat = require('gulp-concat');
var cssmin = require('gulp-clean-css');
var del = require('del');
var jsmin = require('gulp-uglify');
var lint = require('gulp-eslint');
var merge = require('merge-stream');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var vinylPaths = require('vinyl-paths');

var clientRoot = './client/';
var serverRoot = './server/';

gulp.task('clean', function() {
  return gulp.src(clientRoot + 'www/')
    .pipe(vinylPaths(del));
});

gulp.task('build', function() {
  var index = gulp.src([clientRoot + 'index.html', clientRoot + 'jsconfig.json'])
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