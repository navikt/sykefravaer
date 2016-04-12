var path = require("path");
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        app: "./js/index.js"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "http://localhost:8080/assets/",
        filename: "bundle.js"
    },
    module: {
        loaders: [

            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ["react", "es2015"]
                },
                exclude: [nodeModulesPath]
            }

        ]
    },
    devServer: {
        stats: 'errors-only',
    },
};
