var child_process = require('child_process');
var fs = require("fs");

var bundle = function() {
	child_process.exec("webpack -p --config webpack.production.config.js", function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
}

fs.exists("../main/webapp/js", function(exists) {
	if(!exists) {
		console.log("JS-mappe finnes ikke, og vi lager den")
		// Lager JS-mappe hvis den ikke finnes
		fs.mkdir("../main/webapp/js", function() {
			console.log("JS-mappe laget")
			// Når det er gjort, utfører vi bundling
			bundle(); 
		})
	} else {
		console.log("JS-mappe finnes, og vi bundler direkte")
		bundle(); 
	}
});