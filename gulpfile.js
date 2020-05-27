﻿/// <binding Clean='clean' />
"use strict";

const gulp = require("gulp");
const rimraf = require("rimraf");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

gulp.task('imagemin', function () {
  gulp.src('img/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('images'));
});

gulp.task('home', function () {
  return gulp.src('assets/css/home.css')
    .pipe(cleanCSS())
    .pipe(rename('assets/css/home.min.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('plantillas', function () {
  return gulp.src('assets/css/plantillas_estilo.css')
    .pipe(cleanCSS())
    .pipe(rename('assets/css/plantillas_estilo.min.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('main', function () {
  return gulp.src('assets/js/main.js')
    .pipe(uglify())
    .pipe(rename('assets/js/main.min.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('main2', function () {
  return gulp.src('assets/js/main2.js')
    .pipe(uglify())
    .pipe(rename('assets/js/main2.min.js'))
    .pipe(gulp.dest('.'));
});


gulp.task("min", gulp.series(["home", "plantillas", "main", "main2"]));