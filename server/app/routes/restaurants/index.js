'use strict';
import Mongoose from 'mongoose';
const Restaurants = Mongoose.model('Restaurant');
var router = require('express').Router();
var _ = require('lodash');
const Weather = require('weather-js');

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

router.get('/:id/analytics', function (req, res) {
    Weather.find({search: 'New York City, NY', degreeType: 'f'}, (err, response) => {
      if (err) {
        console.log('weather call failed');
        res.json(err);
      } else {
        let regression = req.restaurant.getRegression();
        let predictionData = response[0].forecast[3];
        let prediction = regression.hypothesize({x: [predictionData.high]});
        res.json([prediction, predictionData]);
      }
    });
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
	Restaurants.createWithContact(req.body)
	.then(updatedUsr => res.send(updatedUsr))
	.catch(next);
});

module.exports = router;