'use strict';
import mongoose from 'mongoose';
import User from './user';
const Schema = mongoose.Schema;

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
  fans: [{type: Schema.Types.ObjectId, ref: 'User'}]
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


export default mongoose.model('Restaurant', restaurantSchema);
