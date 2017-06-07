var child_process = require('child_process');
var fs = require("fs");

var timestamp = Date.now().toString();

child_process.exec("webpack -p --config webpack.production.config.js --env.timestamp=" + timestamp, function (error, stdout, stderr) {
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
});

child_process.exec("node build-html.js prod " + timestamp);