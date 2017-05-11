var fs = require("fs");
var Mustache = require("mustache");

var env = process.argv[2];
var timestamp = process.argv[3] || Date.now().toString();

var dev = {
    'timestamp': `${timestamp}`,
    "buildRoot": "http://localhost:8080/assets",
    "restRoot": "http://localhost:8182/syforest",
    "moterestRoot": "http://localhost:8184/moterest/api",
    "bundleFileName": `bundle.js`,
    "enableLogging": true,
    "isProd": false,
};

var prod = {
    'timestamp': `${timestamp}`,
    "buildRoot": "/sykefravaer/js",
    "restRoot": "/syforest",
    "moterestRoot": "/moterest/api",
    "bundleFileName": "bundle-prod.js",
    "enableLogging": false,
    "isProd": true
};

var settings = env === 'prod' ? prod : dev;

console.log("settgings", settings);

fs.readFile("html/syfofront.mustache", function (err, data) {
    if (err) throw err;
    const html = Mustache.render(data.toString(), settings);
    fs.writeFile('../main/webapp/syfofront.html', html, 'utf-8', (err) => {
        if (err) throw err;
    });
});
