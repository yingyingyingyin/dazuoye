
const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const del = require('del');
const connect = require('gulp-connect');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const path = {
  sass: './src/styles/**/*.scss',
  css: './src/styles/**/*.css',
  js: './src/scripts/**/*.js',
  image: './src/image/**/*',
  html: './src/**/*.html',
  fonts:'./src/fonts/**/*'
}

// Clean
gulp.task('clean', function () {
  return del(['./dist']);
});

// Sass
gulp.task('sass', function () {
  return gulp.src(path.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(connect.reload());
});

gulp.task('sass:watch', function () {
  gulp.watch(path.sass, ['sass']);
});

gulp.task('sass:build', function () {
  return gulp.src(path.sass)
    .pipe(sass.sync({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android>=4'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/styles'));
});

// Styles
gulp.task('styles', function () {
  return gulp.src(path.css)
    .pipe(gulp.dest('./dist/styles'))
    .pipe(connect.reload());
});

gulp.task('styles:build', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android>=4'))
    .pipe(minifycss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/styles'));
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src(path.js)
    //.pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(connect.reload());
});

gulp.task('scripts:build', function () {
  return gulp.src(path.js)
    //.pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/scripts'));
});

// Images
gulp.task('image', function () {
  return gulp.src(path.images)
    .pipe(gulp.dest('./dist/image'))
    .pipe(connect.reload());
});

gulp.task('images:build', function () {
  return gulp.src(path.images)
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./dist/image'));
});

// Html
gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('html:build', function () {
  return gulp.src(path.html)
    .pipe(htmlmin({
      removeComments: true, //清除HTML注释
      collapseWhitespace: true, //压缩HTML
      collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
      minifyJS: true, //压缩页面JS
      minifyCSS: true, //压缩页面CSS
    }))
    .pipe(gulp.dest('./dist'));
});
// fonts
gulp.task('fonts', function () {
  return gulp.src(path.fonts)
    .pipe(gulp.dest('./dist/fonts'))
    .pipe(connect.reload());
});

// Watch
gulp.task('watch', function () {
  gulp.watch(path.sass, ['sass']);
  gulp.watch(path.css, ['styles']);
  gulp.watch(path.js, ['scripts']);
  gulp.watch(path.image, ['image']);
  gulp.watch(path.html, ['html']);
});

// Dev
gulp.task('dev', ['sass', 'styles', 'scripts', 'images', 'html','fonts']);

// Serve
gulp.task('serve', ['watch'], function () {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// Default task
gulp.task('default', ['sass:build', 'styles:build', 'scripts:build', 'images:build','fonts']);