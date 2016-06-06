'use strict';
/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

import mongoose from 'mongoose';
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
const User = mongoose.model('User');
const Restaurant = mongoose.model('Restaurant');
const moment = require('moment');
const fs = require('fs');

var getWeather = function(){
  const weather = fs.readFileSync('./server/db/centralpark.csv', 'utf8').split('\n');
  let headers = weather.shift().split(',').slice(1);
  let measured = weather.map(day => {
    let observations = day.split(',');
    let date = observations.shift();
    let returnObj = {};
    returnObj[date] = observations;
    return returnObj;
  });
  return {observations: measured, observationHeaders: headers};
};  

var createHistory = function(){
    let historyStart = moment('2015-06-01');
    let historyEnd = moment('2016-06-02');
    let hist = {};
    while (historyStart.isBefore(historyEnd)) {
      let modifier = 1;
      let month = historyStart.month();
      if (month > 10 || month < 3) {
        modifier = 0.8;
      } else if (month > 5 && month < 9) {
        modifier = 1.3;
      }

      hist[historyStart.format()] = [
              {size: 2, quantity: 6, occupied: Math.round(Math.random()*6*modifier)},
              {size: 4, quantity: 5, occupied: Math.round(Math.random()*5*modifier)},
              {size: 6, quantity: 2, occupied: Math.round(Math.random()*2*modifier)}
              ];

      historyStart.add(1, 'days');
    }
    return hist;
};


var wipeCollections = function () {
    var wipeData = [User.remove({}), Restaurant.remove({})];
    
    return Promise.all(
        wipeData
    );
};

var seedUsers = function (rest) {
    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            restaurants: rest,
            type: 'partner'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            type: 'user'
        }
    ];
    return User.create(users);

};

var seedRestaurants = function () {
    let hist = createHistory();
    let weather = getWeather();
    console.log(weather.observationHeaders);

    let restaurants = [{
        name: 'mcdonalds',
        address: {
            address1: '281 York St.',
            city: 'Jersey City',
            state: 'New Jersey',
            zip: '07302',
            phone: '201-201-2010'
        },
        reservations: [
            {
            start: '2016-06-06T15:30:00',
            end: '2016-06-06T17:30:00',
            id: 6,
            resource: '4',
            text: 'brehnhoffer'
          },
          {
            start: '2016-06-06T16:30:00',
            end: '2016-06-06T18:30:00',
            id: 7,
            resource: '4',
            text: 'jones'
          },
          {
            start: '2016-06-06T15:30:00',
            end: '2016-06-06T17:00:00',
            id: 8,
            resource: '4',
            text: 'smith'
          }
        ],
        seating: [
          {size: 2, quantity: 3},
          {size: 4, quantity: 3},
          {size: 6, quantity: 3}
        ],
        history: hist,
        observations: weather.observations,
        observationHeaders: weather.observationHeaders
      }, {
        name: 'Burger King',
        address: {
            address1: '277 York St.',
            city: 'Jersey City',
            state: 'New Jersey',
            zip: '07302',
            phone: '201-201-2010'
        },
        reservations: [
            {
            start: '2016-06-06T15:30:00',
            end: '2016-06-06T17:30:00',
            id: 2,
            resource: '6',
            text: 'kleinman'
          },
          {
            start: '2016-06-06T16:30:00',
            end: '2016-06-06T18:30:00',
            id: 3,
            resource: '4',
            text: 'escadara'
          },
          {
            start: '2016-06-06T15:30:00',
            end: '2016-06-06T17:00:00',
            id: 4,
            resource: '4',
            text: 'ronson'
          },
          {
            start: '2016-06-06T17:30:00',
            end: '2016-06-06T19:00:00',
            id: 5,
            resource: '2',
            text: 'ronson'
          }
        ],
        seating: [
          {size: 2, quantity: 3},
          {size: 4, quantity: 4},
          {size: 6, quantity: 3}
        ]
      }];



    return Restaurant.create(restaurants);

};

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function() {
        return seedRestaurants();
    })
    .then(function (restaurants) {
        return seedUsers(restaurants);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
