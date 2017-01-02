var fs = require("fs");
var Mustache = require("mustache");

front = process.argv[2];
env = process.argv[3];

var timestamp = Date.now().toString();

var dev = {
    'timestamp': `${timestamp}`,
    "buildRoot": "http://localhost:8080/assets",
    "restRoot": "http://localhost:8182/syforest",
    "moterestRoot": "http://localhost:8184/moterest",
    "bundleFileName": `bundle.js`,
    "enableLogging": true,
};

var prod = {
    'timestamp': `${timestamp}`,
    "buildRoot": "/sykefravaer/js",
    "restRoot": "/syforest",
    "moterestRoot": "/moterest",
    "bundleFileName": "bundle-prod.js",
    "enableLogging": false,
};

fs.readFile(front, function (err, data) {
    if (err) throw err;
    const html = Mustache.render(data.toString(), env === 'prod' ? prod : dev);
    fs.writeFile('../main/webapp/syfofront.html', html, 'utf-8', (err) => {
        if (err) throw err;
    });
});
