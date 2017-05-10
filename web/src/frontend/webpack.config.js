var path = require("path");
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var mainPath = path.resolve(__dirname, 'js', 'index.js');

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
    devServer: {
        stats: 'errors-only',
    },
};
