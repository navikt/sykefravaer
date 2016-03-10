var config = require("./config.js"); 
var request = require("request");
var $ = require("cheerio");
var fragments = {}; 

request(config.DECORATOR_URL, function(error, response, body) {
	var parsedHtml = $.load(body);
	fragments.header = parsedHtml("#header");
	fragments.styles = parsedHtml("#styles");
	fragments.scripts = parsedHtml("#scripts");
	fragments.footer = parsedHtml("#footer");
});

module.exports = fragments;