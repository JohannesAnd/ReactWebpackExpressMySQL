#!/usr/bin/env node

/* This is a console script */
/* eslint-disable no-console */
var express = require("express");
var app = express();
var httpProxy = require("http-proxy");
var proxy = httpProxy.createProxyServer();
var DevServerPort = 3000;

var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = require("./webpack.config.js");
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(__dirname + '/public'));

app.all("*", function goDirectlyToTest(req, res) {
    "use strict";
    proxy.web(req, res, {
        target: "http://localhost:3001",
        changeOrigin: true
    });
});

proxy.on("error", function errorHandler(error) {
    "use strict";
    console.log("PROXY ERROR - Are you running the backend?");
    console.log(error);
});

app.listen(DevServerPort, function serverStarted() {
    "use strict";
    console.log("DEV Server running on port " + DevServerPort);
});