"use strict";
var app = require('express')(),
    express = require("express"),
    server = require('http').Server(app),
    path = require('path'),
    bodyParser = require("body-parser");


    app.use(express.static(__dirname + '/public'))
    app.use(bodyParser.json());

    require('./config/express')(app);
    require('./config/routes')(app);

module.exports = app;
module.exports.server = server;
