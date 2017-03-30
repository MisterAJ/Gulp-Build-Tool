'use strict';

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
     clean = require('gulp-clean-css'),
      maps = require('gulp-sourcemaps'),
  imageMin = require('gulp-imagemin'),
       del = require('del'),
   connect = require('gulp-connect');

/*
 As a developer, I should be able to run the gulp scripts command at the command line to concatenate, minify, and
 copy all of the project’s JavaScript files into an all.min.js file that is then copied to the dist/scripts folder.
 */

gulp.task('scripts', function () {
    return gulp.src([
        'js/circle/autogrow.js',
        'js/circle/circle.js',
        'js/global.js'])
        .pipe(maps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/scripts'))
});

/*
 As a developer, I should be able to run the gulp styles command at the command line to compile the project’s SCSS
 files into CSS, then concatenate and minify into an all.min.css file that is then copied to the dist/styles folder.
 */

/*
 As a developer, when I run the gulp scripts or gulp styles
 commands at the command line, source maps are generated for the JavaScript and CSS files respectively.
 */


gulp.task('styles', () => {
    return gulp.src('sass/global.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(clean())
        .pipe(concat('all.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/styles'))
});


/*
 As a developer, I should be able to run the gulp images command at the command line to optimize
 the size of the project’s JPEG and PNG files, and then copy those optimized images to the dist/content folder.
 */

gulp.task('images', () => {
    return gulp.src(['images/*.jpg', 'images/*.png'])
        .pipe(imageMin())
        .pipe(gulp.dest('dist/content'))
});

/*
 As a developer, I should be able to run the gulp clean command at the command line to delete all of the files and
 folders in the dist folder.
 */

gulp.task('clean', () => {
    return del('dist')
});


/*
 As a developer, I should be able to run the gulp build command at the command line to run the clean, scripts,
 styles, and images tasks with confidence that the clean task completes before the other commands.
 */

gulp.task('build',['clean'], () => {
    gulp.src('index.html')
        .pipe(gulp.dest('dist'));
    gulp.src('icons/**')
        .pipe(gulp.dest('dist/icons'));
    return gulp.start(['scripts', 'styles', 'images']);

});

/*
 As a developer, I should be able to run the gulp command at the command line to run the “build” task.
 */

gulp.task('default',['build'], () => {});

/*
 As a developer, I should be able to run the gulp serve command on the command line to build
 and serve the project using a local web server.
 */

gulp.task('serve', ['build'], () => {
    return connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
});

/*
 As a developer, when I run the gulp watch command, the scripts task should run and the
 current page should be reloaded in the browser when a change is made to any JavaScript (*.js) file.
 */

gulp.task('watch', () => {
    gulp.watch(['js/**/*.js'],['scripts'])
});

/*
 As a developer, when I run the gulp scripts command at the command line, all of my project’s
 JavaScript files will be linted using ESLint and if there’s an error, the error will output to
 the console and the build process will be halted.
 */