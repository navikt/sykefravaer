var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var decorator = require("./setup/decorator.js");

var proxy = httpProxy.createProxyServer();
var app = express();
var mustacheExpress = require("mustache-express");

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/html");

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;

// We only want to run the workflow when not in production
if (!isProduction) {

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require('./server/bundle.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });

}

app.use("/public", express.static("public"));

app.get("/data", function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify([{
      id: 3,
      fnr: "12",
      fornavn: "Kari",
      etternavn: "Nordmann",
      arbeidsgiver: "Rema 1000",
      grad: 100,
      diagnose: "Smerter i nakken",
      friskmeldt: 100,
      status: "UBEKREFTET",
      fom: "2016-02-25T00:00:00Z",
      tom: "2016-03-10T00:00:00Z"
    }, {
      id: 1,
      fnr: "12",
      fornavn: "Kari",
      etternavn: "Nordmann",
      arbeidsgiver: "Rema 1000",
      grad: 100,
      diagnose: "Vondt i ryggen",
      friskmeldt: 100,
      status: "BEKREFTET",
      fom: "2015-03-12T00:00:00Z",
      tom: "2015-03-18T00:00:00Z"
    }, {
      id: 2,
      fnr: "12",
      fornavn: "Kari",
      etternavn: "Nordmann",
      arbeidsgiver: "OLSEN TRANSPORT",
      grad: 100,
      diagnose: "Influensalignende symptom",
      friskmeldt: 100,
      status: "AVVIST",
      fom: "2014-12-04T00:00:00Z",
      tom: "2014-12-14T00:00:00Z"
    }, {
      id: 4,
      fnr: "12",
      fornavn: "Kari",
      etternavn: "Nordmann",
      arbeidsgiver: "Tøyen Skole",
      grad: 100,
      diagnose: "Lett depresjon",
      friskmeldt: 100,
      status: "BEKREFTET",
      fom: "2014-03-10T00:00:00Z",
      tom: "2014-03-18T00:00:00Z"
    }])
  )
})

app.get("*", function(req, res) {

  var slashCount = (req.originalUrl.match(/\//g) || []).length;
  var appRoot = "", publicRoot = "", buildRoot = "";

  for(var i = 0; i < slashCount; i++) {
    appRoot = "../" + appRoot
  }; 

  if(!isProduction) {
    publicRoot = appRoot + "public/";
    buildRoot = appRoot + "build/"; 
  } else {
    publicRoot = appRoot + "public/";
    buildRoot = publicRoot    
  }

  res.render("root", {
    decorator: decorator, 
    title: "Ditt sykefravær",
    publicRoot: publicRoot,
    buildRoot: buildRoot
  });

});

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});