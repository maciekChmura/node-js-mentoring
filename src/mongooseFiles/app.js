'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import router
const { citiesRoutes, usersRoutes, productsRoutes } = require('./routes');

// connect to database
const URI = 'mongodb://luke:4qwerty@ds217921.mlab.com:17921/node-mentoring';
mongoose.connect(URI);
const db = mongoose.connection;

// check for database errors
db.on('error', error => console.log(error));
// check connection
db.once('open', () => console.log('Connected to MongoDB'));

// init express app
const app = express();

// Body Parser middleware application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Routes
app.use('/api/cities', citiesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);

// start server
app.listen(8082, () => console.log('Mongoose app Listening on port 8082'));


module.exports = app;
