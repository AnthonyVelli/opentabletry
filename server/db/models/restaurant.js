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

var restaurantSchema = new Schema({
    name: {
        type: String
    },
    contact: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    address: addressSchema,
    seating: {
        type: Schema.Types.Mixed
    },
    reservations: []

});


export default mongoose.model('Restaurant', restaurantSchema);
