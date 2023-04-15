// Include gulp
const gulp = require('gulp');

// Include plugins
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');

gulp.task('pug', function buildHTML() {
  return gulp
    .src('./views/**/*.pug')
    .pipe(pug({ pretty: false }))
    .pipe(gulp.dest('dist'));
});

// Compile Sass
gulp.task('css', function () {
  return gulp
    .src('public/CSS/**/*.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

// Concatenate and minify JavaScript
gulp.task('scripts', function () {
  return gulp
    .src('public/JS/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

// Default task
gulp.task('build', gulp.parallel('css', 'scripts', 'pug'));
