var path = require("path");
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var mainPath = path.resolve(__dirname, 'js', 'index.js');
var autoprefixer = require("autoprefixer");

module.exports = {
    entry: ["babel-polyfill", mainPath],
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "http://localhost:8080/assets/",
        filename: "bundle.js"
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
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "postcss-loader",
                    options: {
                        plugins: function() {
                            return [autoprefixer]
                        }
                    }
                }, {
                    loader: "less-loader", options: {
                        paths: [
                            path.resolve(__dirname, 'node_modules')
                        ]
                    }
                }]
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
    devServer: {
        stats: 'errors-only',
    },
};
