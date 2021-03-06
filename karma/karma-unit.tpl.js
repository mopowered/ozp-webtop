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
      'vendor/jasmine-jquery/lib/jasmine-jquery.js',  // used for loading JSON
                                                      // text fixtures
      'vendor/es5-shim/es5-shim.js', // PhantomJS is missing
                                                  // Function.prototype.call.bind
                                                  // and requires polyfills
      <% scripts.forEach( function ( file ) { %>'<%= file %>',
      <% }); %>
      'src/**/*.js',
      'src/**/*.coffee',

      // fixtures
      {pattern: 'testData/*.json', watched: true, served: true, included: false}
    ],
    exclude: [
      'src/assets/**/*.js'
    ],
    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-jasmine', 'karma-coffee-preprocessor', 'karma-phantomjs-launcher', 'karma-coverage' ],
    preprocessors: {
      '**/*.coffee': 'coffee',
      // Do not include specs when running coverage report.
      // See: https://github.com/ngbp/ngbp/issues/122
      'src/app/**/!(*spec).js': ['coverage']
    },

    /**
     * How to report, by default.
     */
    reporters: ['progress', 'coverage'],

    // Code coverage reporting
    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
      // Do not use "browser" subdir (PhantomJS in our case)
      subdir : '.'
    },

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
