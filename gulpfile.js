var gulp = require('gulp'),
    handlebars = require('gulp-handlebars'),
    serve = require('gulp-serve'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),
    del = require('del'),
    browserify  = require('browserify'),
    source = require('vinyl-source-stream'),
    jasmineBrowser = require('gulp-jasmine-browser');

open = require('gulp-open');

gulp.task('precompileTemplates', function(){
    return gulp.src('templates/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'LoanCalculatorView.templates',
            noRedeclare: true,
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('js/'));
});

gulp.task('serve', serve('.'));

gulp.task('open', function(){
    var options = {
        uri: 'http://localhost:3000',
        app: 'google chrome'
    };
    return gulp.src('.')
        .pipe(open(options));
});

gulp.task('browserify', function() {
    return browserify({
        entries: 'js/dependencies/main.js',
        debug: true
    }).bundle()
        .pipe(source('modules.js'))
        .pipe(gulp.dest('js/bundles/'));
});

gulp.task('test', function() {
    return gulp.src(['tests/**/*.js', 'js/bundles/bundle.js'])
        .pipe(jasmineBrowser.specRunner())
        .pipe(jasmineBrowser.server({port: 8888}));
});

gulp.task('bundle', function () {
    return gulp.src(['js/bundles/modules.js', 'js/**/*', '!js/dependencies/main.js', '!js/app.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('js/bundles/'));
});

gulp.task('clean', function() {
    return del(['js/bundles/*']);
});

gulp.task('build',  gulp.series('clean', 'browserify', 'precompileTemplates', 'bundle'));

gulp.task('start',  gulp.series('build', 'open', 'serve'));