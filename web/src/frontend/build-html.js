var fs = require("fs");
var Mustache = require("mustache");

var env = process.argv[2];
var timestamp = process.argv[3] || Date.now().toString();

var dev = {
    'timestamp': `${timestamp}`,
    "buildRoot": "http://localhost:9090/assets",
    "restRoot": "http://localhost:8080/syforest",
    "syfoteksterrestRoot": "http://localhost:8080/syfotekster/api",
    "moterestRoot": "http://localhost:8080/moterest/api",
    "oppfoelgingsdialogrestRoot": "http://localhost:8580/restoppfoelgingsdialog/api",
    "bundleFileName": `bundle.js`,
    "enableLogging": true,
    "isProd": false,
};

var prod = {
    'timestamp': `${timestamp}`,
    "buildRoot": "/sykefravaer/js",
    "restRoot": "/syforest",
    "syfoteksterrestRoot": "/syfotekster/api",
    "moterestRoot": "/moterest/api",
    "oppfoelgingsdialogrestRoot": "/restoppfoelgingsdialog/api",
    "bundleFileName": "bundle-prod.js",
    "enableLogging": false,
    "isProd": true
};

var settings = env === 'prod' ? prod : dev;

fs.readFile("html/syfofront.mustache", function (err, data) {
    if (err) throw err;
    const html = Mustache.render(data.toString(), settings);
    fs.writeFile('../main/webapp/syfofront.html', html, 'utf-8', (err) => {
        if (err) throw err;
    });
});
