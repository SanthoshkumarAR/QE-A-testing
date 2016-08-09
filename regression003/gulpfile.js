'use strict';

/**
 * Module dependencies.
 */
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var karma = require('karma').server;


//Task to run DB unit test cases. Thsi will test the CRUD operations in the database
gulp.task('test_DB', function (done) {
    // Open mongoose connections
  var mongoose = require('./config/lib/mongoose.js');
  var error;

    // Connect mongoose
  mongoose.connect(function () {
    mongoose.loadModels();

    gulp.src('./modules/todo/tests/server/todo.server.model.tests.js', { read: false })
        // gulp-mocha needs filepaths so you can't have any plugins before it
            .pipe(mocha({ reporter: 'spec' }))
        .on('error', function (err) {
            // If an error occurs, save it
          error = err;
        })
            .on('end', function () {
                // When the tests are done, disconnect mongoose and pass the error state back to gulp
              mongoose.disconnect(function () {
                done(error);
              });
            });
  });
});

//Sub task which initiates the istanbul for code coverage
gulp.task('pre-test_server', function () {
  return gulp.src(['./modules/todo/server/**/*.js'])
    // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

//Task to start the server tests and runs the subtask pre-test_server for code coverage
gulp.task('test_server', ['pre-test_server'], function () {
  return gulp.src(['./modules/todo/tests/server/todo.server.routes.tests.js'])
        .pipe(mocha({ globals: {
            env: require('./server.js')
        }}))
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports({ dir: './modules/todo/tests/results/coverage' }));

});

//Task to run the jshint for all the js source files
gulp.task('jshint', function () {
  return gulp
        .src(['*.js', './modules/todo/server/**/*.js','./module/todo/client/**/*.js'])
        .pipe(jshint())
        //Set the option as node source files
        .pipe(jshint({ 'node': true , 'jquery':true, 'mocha':true }))
        //Setting the report type
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

//Task to run the UI Test cases using karma
gulp.task('test_UI', function(done) {
  return karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
    done();
  });
});

