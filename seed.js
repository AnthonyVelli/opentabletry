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
    let add = {
        address1: '281 York St.',
        city: 'Jersey City',
        state: 'New Jersey',
        zip: '07302',
        phone: '201-201-2010'
    };

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
        ]
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
