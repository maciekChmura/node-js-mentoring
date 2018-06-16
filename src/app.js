'use strict';

const config = require('./config/config');
const User = require('./models/User');
const Product = require('./models/Product');
const { DirWatcher } = require('./dirWatcher');
const Importer = require('./importer');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

console.log(config.name);

const product = new Product();
const user = new User();

const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.watch('./data', 1000);
importer.listen(dirWatcher);

// express app
const app = express();

const userName = 'Luke';
const password = 'may4';
const authSuccess = {
  code: 200,
  message: 'OK',
  data: {
    user: {
      email: 'email@gmail.com',
      username: userName,
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
  if (userName === req.parsedQuery.userName
    && password === req.parsedQuery.password) {
    const token = jwt.sign(authSuccess, 'shhh');
    res.send(JSON.stringify(authSuccess));
    res.end();
  } else {
    res.send(JSON.stringify(authFailed));
    res.end();
  }
});

module.exports = app;
