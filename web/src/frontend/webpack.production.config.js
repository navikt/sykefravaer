var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = '../main/webapp/js';
var mainPath = path.resolve(__dirname, 'js', 'index.js');

var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: {
    app: "./js/index.js"
  },
  output: {
    path: buildPath,
    filename: 'bundle-prod.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ["react", "es2015"]
      },      
      exclude: [nodeModulesPath]
    }]
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": "'production'"
    })
  ]
};

module.exports = config;