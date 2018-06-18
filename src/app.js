'use strict';

const config = require('./config/config');
const User = require('./models/User');
const Product = require('./models/Product');
const { DirWatcher } = require('./dirWatcher');
const Importer = require('./importer');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

console.log(config.name); // eslint-disable-line no-console

const product = new Product(); // eslint-disable-line no-unused-vars
const user = new User(); // eslint-disable-line no-unused-vars

const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.watch('./data', 1000);
importer.listen(dirWatcher);

// express app
const app = express();
app.use(cookieParser());

app.use((req, res, next) => {
  req.parsedCookies = req.cookies;
  console.log(req.parsedCookies); // eslint-disable-line no-console
  next();
});

app.use((req, res, next) => {
  req.parsedQuery = req.query;
  console.log(req.parsedQuery); // eslint-disable-line no-console
  next();
});

app.get('/', (req, res) => {
  res.end('hello express');
});

app.get('/api/products', (req, res) => {
  res.send('Returning ALL products');
  res.end();
});

app.get('/api/products/:id', ({ params: { id } }, res) => {
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

const testUser = {
  id: '1',
  userName: 'Luke',
  email: 'jedimasta@republic.com',
  password: 'may4',
};

const authSuccess = {
  code: 200,
  message: 'OK',
  data: {
    user: {
      email: testUser.email,
      userName: testUser.userName,
    },
  },
  token: '...',
};
const authFailed = {
  code: 404,
  message: 'Not Found',
  data: 'additional error response data if needed',
};

app.get('/auth', (req, res) => {
  if (testUser.userName === req.parsedQuery.userName
    && testUser.password === req.parsedQuery.password) {
    const token = jwt.sign(testUser, 'secretKey'); // eslint-disable-line no-unused-vars
    res.send(JSON.stringify(authSuccess));
    res.end();
  } else {
    res.status(404).send(JSON.stringify(authFailed));
    res.end();
  }
});

module.exports = app;
