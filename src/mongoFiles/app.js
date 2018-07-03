'use strict';

const express = require('express');
const { MongoClient } = require('mongodb');

const initializeDatabases = require('./db');
const routes = require('./routes');

const app = express();

initializeDatabases().then((dbs) => {
  // Initialize the application once database connections are ready.
  routes(app, dbs).listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
  console.error('Failed to make all database connections!');
  console.error(err);
  process.exit(1);
});

module.exports = app;
