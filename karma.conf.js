// Karma configuration
// Generated on Fri Jul 09 2021 17:43:25 GMT+0800 (中国标准时间)
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpackConfig = require('./webpack.config')
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // plugins: [
    //   'karma-chrome-launcher',
    //   'karma-mocha',
    //   'karma-chai',
    //   'karma-spec-reporter',
    //   'karma-coverage',
    //   'karma-webpack'
    // ],
    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'tests/**/*.spec.js', watched: false }
     ],


    // list of files / patterns to exclude
    exclude: [
      'tests/**/consolePlatform.spec.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'tests/**/*.js': [ 'webpack']
    },
    webpack: webpackConfig,
    // webpack: {
    //   plugins: [
    //     new VueLoaderPlugin()
    //   ],
    //   module: {
    //     rules: [{
    //       test: /.*\.js/,
    //       use: {
    //         loader: 'babel-loader',
    //         options: {
    //           plugins: ['@babel/plugin-transform-runtime']
    //         }
    //       }
    //     },{
    //       test: /\.vue$/,
    //       loader: 'vue-loader'
    //   }]
    //   }
    // },
    // webpackMiddleware: {
    //   noInfo: true
    // },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    // browsers: ['PhantomJS'],
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity
  })
}
