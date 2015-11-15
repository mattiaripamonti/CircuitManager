/**
 * Created by Mripamonti on 08/11/2015.
 */
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var morgan = require('morgan'); // formerly express.logger
var errorhandler = require('errorhandler');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// express/connect middleware
app.use(morgan('dev'));

// serve up static assets
app.use(express.static(path.join(__dirname, '/app')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// development only
if ('development' === app.get('env')) {
    app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('myApp server listening on port ' + app.get('port'));
});