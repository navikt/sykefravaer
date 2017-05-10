var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, "../main/webapp/js");
var mainPath = path.resolve(__dirname, 'js', 'index.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = function (opts) {
  var timestamp = opts.timestamp;
  var extractLess = new ExtractTextPlugin({
    filename: "styles." + timestamp + ".css",
    disable: false,
  });

  return {
    // We change to normal source mapping
    devtool: 'source-map',
    entry: ['babel-polyfill', mainPath],
    output: {
      path: buildPath,
      filename: 'bundle-prod.js'
    },
    resolve: {
        alias: {
            react: path.join(__dirname, 'node_modules', 'react')
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLess.extract({
                  use: [{
                    loader: "css-loader"
                  }, {
                    loader: "less-loader"
                  }]
                })
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["react", "es2015", "babel-preset-stage-1"]
                    }
                }]
            },
            {
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                use: [{
                    loader: 'svg-url-loader'
                }]
            }
        ]
    },
    plugins: [
      extractLess,
      new Webpack.DefinePlugin({
        "process.env.NODE_ENV": "'production'"
      })
    ]
  };
}

module.exports = config;