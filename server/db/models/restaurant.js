'use strict';
import mongoose from 'mongoose';
import User from './user';
const Schema = mongoose.Schema;
const SMR = require('smr');

const addressSchema = {
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  phone: { type: String }
};

const reservationSchema ={
  start: {type: String},
  end: {type: String},
  id: {type: String},
  resource: {type: String},
  text: {type: String}
};

var restaurantSchema = new Schema({
  name: {type: String},
  address: addressSchema,
  seating: {type: Schema.Types.Mixed},
  contact: {type: Schema.Types.ObjectId, ref: 'User'},
  reservations: [reservationSchema],
  fans: [{type: Schema.Types.ObjectId, ref: 'User'}],
  history: {type: Schema.Types.Mixed},
  observations: [{type: Schema.Types.Mixed}],
  observationHeaders: []

});

restaurantSchema.statics.createWithContact = function(rest) {
  var foundContactScope;
  return User.findById(rest.contact)
  .then(foundContact => {
    foundContactScope = foundContact;
    return this.create(rest); })
  .then(createdRest => {
    foundContactScope.restaurants ? foundContactScope.restaurants.push(createdRest) : foundContactScope.restaurants = [createdRest];
    return foundContactScope.save(); })
  .then(updatedContact => updatedContact);
};

restaurantSchema.methods.getRegression = function(){
  const regression = new SMR.Regression({ numX: 1, numY: 1 });
  let data = this.observations.map(day => {
    let key = Object.keys(day)[0];
    return [day[key][4]];
  });
  let dependant = [];
  for (var day in this.history) {
    let seatsUsed = this.history[day].reduce((orig, tabl) => {
      return orig + tabl.size * tabl.occupied;
    }, 0);
    dependant.push(seatsUsed);
  }
  dependant.forEach((hist, idx) => {
    console.log({x: data[idx], y: [hist]});
    regression.push({x: data[idx], y: [hist]});
  });
  return regression;
};




export default mongoose.model('Restaurant', restaurantSchema);
