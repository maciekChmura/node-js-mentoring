'use strict';

const mongoose = require('mongoose');

// User schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
});

module.exports = mongoose.model('USer', userSchema);
