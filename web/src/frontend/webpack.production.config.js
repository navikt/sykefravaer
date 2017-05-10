var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, "../main/webapp/js");
var mainPath = path.resolve(__dirname, 'js', 'index.js');

var config = {

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
              test: /\.js$/,
              exclude: [/node_modules/],
              use: [{
                  loader: 'babel-loader',
                  options: {
                      presets: ["react", "es2015", "babel-preset-stage-1"]
                  }
              }]
          }
      ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": "'production'"
    })
  ]
};

module.exports = config;