// Include gulp
const gulp = require('gulp');

// Include plugins
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

// Compile Sass
gulp.task('sass', function () {
  return gulp
    .src('public/CSS/**/*.css')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
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

// Watch files for changes
gulp.task('watch', function () {
  gulp.watch('public/CSS/**/*.css', gulp.series('sass'));
  gulp.watch('public/JS/**/*.js', gulp.series('scripts'));
});

// Default task
gulp.task('default', gulp.parallel('sass', 'scripts', 'watch'));
