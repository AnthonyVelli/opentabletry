'use strict';
import Mongoose from 'mongoose';
const Restaurants = Mongoose.model('Restaurant');
var router = require('express').Router();
var _ = require('lodash');

router.param('id', (req, res, next, id) => {
	Restaurants.findById(id)
	.then(rest => {
		req.restaurant = rest;
		next(); })
	.catch(next);
});

router.get('/:id', function (req, res) {
    res.json(req.restaurant);
});

router.get('/', function (req, res, next) {
    Restaurants.find().then(restaurants => res.send(restaurants))
    .catch(next);
});

router.put('/', function (req, res, next) {
	Restaurants.findById(req.body._id)
	.then(foundRest => {
		delete req.body._id;
		delete req.body.__v;
		_.assign(foundRest, req.body);
		return foundRest.save(); })
	.then(updatedRest => {
		res.json(updatedRest); })
	.catch(next);
});

router.post('/', (req, res, next) => {
	Restaurants.create(req.body)
	.then(newRest => res.send(newRest))
	.catch(next);
});

module.exports = router;