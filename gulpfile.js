var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var install = require('gulp-install');
var shrinkwrap = require('gulp-shrinkwrap');

gulp.task('clean', function(cb) {
  return del(['./dist'], cb);
});

gulp.task('copy', function() {
  return gulp.src([
    'config/**',
    'src/**',
    'package.json'
  ], {base: '.'})
    .pipe(plumber())
    .pipe(gulp.dest('./dist'))
  ;
});

gulp.task('npm-install', function() {
  return gulp
    .src(['./dist/package.json'])
    .pipe(install({production: true}))
  ;
});

gulp.task('shrinkwrap', function() {
  return gulp.src('./dist/package.json')
    .pipe(shrinkwrap.lock({devDependencies: false}))
    .pipe(gulp.dest('./dist'))
  ;
});

gulp.task('build', function(callback) {
  runSequence(
    'clean',
    'copy',
    'shrinkwrap',
    'npm-install',
    callback
  );
});

gulp.task('default', ['build']);