'use strict';

const express = require('express');

const initializeDatabases = require('./db');
const routes = require('./routes');

const app = express();

initializeDatabases().then((dbs) => {
  // Initialize the application once database connections are ready.
  routes(app, dbs).listen(8081, () => console.log('Mongo Driver app Listening on port 8081'));
}).catch((err) => {
  console.error('Failed to make all database connections!');
  console.error(err);
  process.exit(1);
});

module.exports = app;
