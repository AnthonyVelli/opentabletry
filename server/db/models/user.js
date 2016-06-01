'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
import Restaurant from './restaurant';
var _ = require('lodash');

var schema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    restaurants: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ],
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};
function createAll(user) {
    if (user.restaurants){
        let newRest = user.restaurants;
        delete user.restaurants;
        return createPartner(user, newRest, this);
    } else {
        return this.create(user);
    }
}

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};



schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});



function createPartner(partner, newRest, User) {
    var createdUsr;
    return User.create(partner)
    .then(newUsr => {
        createdUsr = newUsr;
        newRest.contact = newUsr;
        return Restaurant.create(newRest); })
    .then(createdRest => {
        createdUsr.restaurants = [createdRest];
        return createdUsr.save(); })
    .then(updatedUsr => updatedUsr);
}

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;
schema.statics.createAll = createAll;
schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

export default mongoose.model('User', schema);
