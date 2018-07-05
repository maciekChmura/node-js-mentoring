'use strict';

const mongoose = require('mongoose');

// City schema
const citySchema = mongoose.Schema({
  country: String,
  name: {
    type: String,
    required: true,
  },
  capital: {
    type: Boolean,
    required: true,
  },
  location: {
    lat: String,
    lng: String,
  },
});

module.exports = mongoose.model('City', citySchema);
