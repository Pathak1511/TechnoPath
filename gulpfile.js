// Include gulp
const gulp = require('gulp');

// Include plugins
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const pug = require('gulp-pug');

gulp.task('assets', function () {
  return gulp.src('public/Img/**/*').pipe(gulp.dest('dist/Img'));
});

gulp.task('pug', function () {
  return gulp
    .src('./views/**/*.pug')
    .pipe(
      pug({
        pretty: false,
        locals: {
          includeFunc: function (path) {
            return pug.renderFile(path, { pretty: true });
          },
        },
      })
    )
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

gulp.task('build', gulp.parallel('assets', 'css', 'scripts', 'pug'));
