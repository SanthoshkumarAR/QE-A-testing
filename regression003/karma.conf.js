'use strict';

// Karma configuration
module.exports = function (karmaConfig) {
  karmaConfig.set({
    // Frameworks to use
    frameworks: ['jasmine'],

    preprocessors: {
      // Standalone script to turn Angular template into js and put it in a module
      'modules/todo/client/views/**/*.html': ['ng-html2js'],
      'modules/todo/client/*.js': ['coverage'],
      'modules/todo/client/controllers/*.js': ['coverage'],
      'modules/todo/client/services/*.js': ['coverage']
    },
    ngHtml2JsPreprocessor: {
      // create only a single module that contains templates
      moduleName: 'todo',
      // Function that transforms the path to look exactly like
      // the one in templateUrl in Angular code
      cacheIdFromPath: function (filepath) {
        return filepath;
      }
    },
    // List of files / patterns to load in the browser
    files: [
      'public/lib/angular/angular.js',
      'public/lib/angular-resource/angular-resource.js',
      'public/lib/angular-animate/angular-animate.js',
      'public/lib/angular-messages/angular-messages.js',
      'public/lib/angular-ui-router/release/angular-ui-router.js',
      'public/lib/angular-ui-utils/ui-utils.js',
      'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
      'public/lib/angular-file-upload/angular-file-upload.js',
      'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
      'public/lib/angular-mocks/angular-mocks.js',
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/todo/tests/client/**/*.js',
      'modules/todo/client/views/**/*.html',
	  'modules/*/client/*.js',
      'modules/*/client/**/*.js',
      <!--$$Files to abe added for Authentication$$-->
    ],


    // Test results reporter to use
    // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-ng-html2js-preprocessor'
    ],

    reporters: ['spec', 'coverage'],
        // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'modules/todo/tests/results/coverage'
    },

        // Web server port
    port: 9876,

        // Enable / disable colors in the output (reporters and logs)
    colors: true,

        // Level of logging
        // Possible values: karmaConfig.LOG_DISABLE || karmaConfig.LOG_ERROR || karmaConfig.LOG_WARN || karmaConfig.LOG_INFO || karmaConfig.LOG_DEBUG
    logLevel: karmaConfig.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
    browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

        // Continuous Integration mode
        // If true, it capture browsers, run tests and exit
    singleRun: true
  });
};
