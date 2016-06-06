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


router.get('/:id', ensureAuthenticated, (req, res, next) => {
	res.json(req.user);
});

router.get('/', ensureAuthenticated, (req, res, next) => {
	User.find()
	.then(users => res.json(users))
	.catch(next); 
});

router.post('/', (req, res, next) => {
    User.createAll(req.body)
    .then(newUsr => res.json(newUsr))
    .catch(next);
});


module.exports = router;