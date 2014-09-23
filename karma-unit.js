module.exports = function ( karma ) {
  karma.set({
    /** 
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [
      'vendor/jquery/dist/jquery.js',   // added by ARW - useful for testing
                                        // purposes since jqLite is gimped (e.g.
                                        // their find method). Must be loaded
                                        // before angular!
      'vendor/ozp-iwc/app/js/common/es5-shim.js', // PhantomJS is missing
                                                  // Function.prototype.call.bind
                                                  // and requires polyfills
      'vendor/jquery/dist/jquery.js',
      'vendor/jquery-ui/jquery-ui.min.js',
      'vendor/angular/angular.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-gridster/dist/angular-gridster.min.js',
      'vendor/javascript-detect-element-resize/detect-element-resize.js',
      'vendor/ozp-iwc-angular/dist/js/ozpIwc-client-angular.js',
      'vendor/es6-promise/promise.min.js',
      'vendor/ozp-classification/jquery.classification.js',
      'vendor/ozp-classification/ozp-classification.js',
      'build/templates-app.js',
      'build/templates-common.js',
      'vendor/angular-mocks/angular-mocks.js',
      
      'src/**/*.js',
      'src/**/*.coffee',

    ],
    exclude: [
      'src/assets/**/*.js'
    ],
    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-jasmine', 'karma-coffee-preprocessor', 'karma-phantomjs-launcher' ],
    preprocessors: {
      '**/*.coffee': 'coffee',
    },

    /**
     * How to report, by default.
     */
    reporters: 'dots',

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9018,
    runnerPort: 9100,
    urlRoot: '/',

    /** 
     * Disable file watching by default.
     */
    autoWatch: false,

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      'PhantomJS'
    ]
  });
};

