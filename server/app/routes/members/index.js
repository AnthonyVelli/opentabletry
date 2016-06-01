'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');

var router = require('express').Router();
var _ = require('lodash');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.param('id', (req, res, next, id) => {
	User.findById(id)
	.then(user => {
		req.user = user;
		next(); })
	.catch(next);
});

router.get('/', function (req, res, next) {
	User.find()
	.then(users => res.json(users))
	.catch(nxt => {
		console.log(nxt)
		next(); });
});

router.post('/', function (req, res, next) {
    User.createAll(req.body)
    .then(newUsr => res.json(newUsr))
    .catch(next);
});


module.exports = router;