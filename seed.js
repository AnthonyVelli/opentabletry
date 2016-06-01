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
const Restaurant = mongoose.model('Restaurant');;

var wipeCollections = function () {
    var wipeData = [User.remove({})];
    wipeData.push(Restaurant.remove({}));
    return Promise.all(
        wipeData
    );
};

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.create(users);

};

var seedRestaurants = function (adminID) {
    let add = {
        address1: '121 Jones St.',
        city: 'Jersey City',
        state: 'New Jersey',
        zip: '07302',
        phone: '201-201-2010'
    };

    let restaurants = [{
        address: add,
        admin: adminID,
        seating: {
            1: 50,
            2: 25,
            3: 15,
            4: 10,
            5: 3,
            6: 1
        }
    }];


    return Restaurant.create(restaurants);

};

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedUsers();
    })
    .then(function(users) {
        return seedRestaurants(users[0]);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
