var fs = require("fs");
var Mustache = require("mustache");

var env = process.argv[2];
console.log("env", env);
var timestamp = process.argv[3] || Date.now().toString();

var dev = {
    'timestamp': `${timestamp}`,
    "buildRoot": "http://localhost:9090/assets",
    "restRoot": "http://localhost:8080/syforest",
    "moterestRoot": "http://localhost:8080/moterest/api",
    "oppfoelgingsdialogrestRoot": "http://localhost:8580/oppfoelgingsdialogrest/api",
    "bundleFileName": `bundle.js`,
    "enableLogging": true,
    "isProd": false,
};

var prod = {
    'timestamp': `${timestamp}`,
    "buildRoot": "/sykefravaer/js",
    "restRoot": "/syforest",
    "moterestRoot": "/moterest/api",
    "oppfoelgingsdialogrestRoot": "/oppfoelgingsdialogrest/api",
    "bundleFileName": "bundle-prod.js",
    "enableLogging": false,
    "isProd": true
};

var settings = env === 'prod' ? prod : dev;

console.log("settings", settings)

fs.readFile("html/syfofront.mustache", function (err, data) {
    if (err) throw err;
    const html = Mustache.render(data.toString(), settings);
    fs.writeFile('../main/webapp/syfofront.html', html, 'utf-8', (err) => {
        if (err) throw err;
    });
});
