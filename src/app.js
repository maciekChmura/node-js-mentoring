'use strict';

const config = require('./config/config');
const User = require('./models/User');
const Product = require('./models/Product');
const { DirWatcher } = require('./dirWatcher');
const Importer = require('./importer');
const express = require('express');
const cookieParser = require('cookie-parser');

console.log(config.name); // eslint-disable-line

const product = new Product(); // eslint-disable-line
const user = new User(); // eslint-disable-line

const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.watch('./data', 1000);
importer.listen(dirWatcher);

// express app
const app = express();
app.use(cookieParser());

app.use((req, res, next) => {
  req.parsedCookies = req.cookies;
  console.log(req.parsedCookies);
  next();
});

app.use((req, res, next) => {
  req.parsedQuery = req.query;
  console.log(req.parsedQuery);
  next();
});

app.get('/', (req, res) => {
  res.end('hello express');
});

app.get('/api/products', (req, res) => {
  res.send('Returning ALL products');
  res.end();
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Return SINGLE product of id: ${id}`);
  res.end();
});

app.get('/api/products/:id/reviews', (req, res) => {
  const { id } = req.params;
  res.send(`Return ALL reviews for a single product of id: ${id}`);
  res.end();
});

app.get('/api/users', (req, res) => {
  res.send('Return ALL users');
  res.end();
});

app.post('/api/products', (req, res) => {
  res.send('Add NEW product and return it');
  res.end();
});

module.exports = app;
