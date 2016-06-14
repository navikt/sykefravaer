var fs = require("fs");
var Mustache = require("mustache");

front = process.argv[2];
env = process.argv[3];

var timestamp = Date.now().toString();

var dev = {
    'timestamp': `${timestamp}`,
    "buildRoot": "http://localhost:8080/assets",
    "restRoot": "http://localhost:8182/syforest",
    "bundleFileName": `bundle.js`,
};

var prod = {
    'timestamp': `${timestamp}`,
    "buildRoot": "/sykefravaer/js",
    "restRoot": "/syforest",
    "bundleFileName": "bundle-prod.js"
};

fs.readFile(front, function (err, data) {
    if (err) throw err;
    const html = Mustache.render(data.toString(), env === 'prod' ? prod : dev);
    fs.writeFile('../main/webapp/syfofront.html', html, 'utf-8', (err) => {
        if (err) throw err;
    });
});
