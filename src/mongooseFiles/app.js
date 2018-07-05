'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
// const { getRandomItem } = require('../helpers');

// import models
// const Cities = require('./models/city');
// const Users = require('./models/user');
// const Products = require('./models/product');

// import router
const { citiesRoutes, usersRoutes, productsRoutes } = require('./routes');

// connect to database
const URI = 'mongodb://luke:4qwerty@ds217921.mlab.com:17921/node-mentoring';
mongoose.connect(URI);
const db = mongoose.connection;

// check connection
db.once('open', () => console.log('Connected to MongoDB'));
// check for database errors
db.on('error', error => console.log(error));

// init express app
const app = express();

// Body Parser middleware application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Routes
app.use('/cities', citiesRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

// get random city
// app.get('/randomCity', (req, res) => {
//   Cities.find({}, (error, cities) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.send(getRandomItem(cities));
//     }
//   });
// });


// start server
app.listen(8082, () => console.log('Mongoose app Listening on port 8082'));


module.exports = app;
