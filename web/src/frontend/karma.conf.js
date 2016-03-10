var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ["PhantomJS"],
        singleRun: false,
        frameworks: ['mocha'],
        files: [
            'tests.webpack.js'
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack'],
            'js/**/*.js': ['coverage']
        },
        plugins: [
            require("karma-webpack"), 
            require("karma-mocha"),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require("karma-coverage")
        ],     
        coverageReporter: {
          type : 'html',
          dir : 'coverage/',
          instrumenters: { isparta : require('isparta') },
          instrumenter: {
            'js/**/*.js': 'isparta'
          }
        },
        reporters: ['dots', 'coverage'],
        webpack: {
            module: {
                loaders: [
                    {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
                ]
            },
            watch: true
        },
        webpackServer: {
            noInfo: true
        }
    });
};