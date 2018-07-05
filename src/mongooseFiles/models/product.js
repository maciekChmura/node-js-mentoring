'use strict';

const mongoose = require('mongoose');

// Product schema
const productSchema = mongoose.Schema({
  name: String,
  weight: Number,
});

module.exports = mongoose.model('Product', productSchema);
