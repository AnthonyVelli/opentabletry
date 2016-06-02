'use strict';
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const requestIp = require('request-ip');

module.exports = function (app) {

    // Important to have this before any session middleware
    // because what is a session without a cookie?
    // No session at all.
 
// inside middleware handler 

	app.use(requestIp.mw());
    app.use(cookieParser());

    // Parse our POST and PUT bodies.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

};