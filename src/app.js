'use strict';

// const config = require('./config/config');
// const User = require('./models/User');
// const Product = require('./models/Product');
const { DirWatcher } = require('./dirWatcher');
const Importer = require('./importer');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const usersController = require('./controllers').users;

// console.log(config.name); // eslint-disable-line no-console

// const product = new Product(); // eslint-disable-line no-unused-vars
// const user = new User(); // eslint-disable-line no-unused-vars

const dirWatcher = new DirWatcher();
const importer = new Importer();

// dirWatcher.watch('./data', 1000);
// importer.listen(dirWatcher);

const testUser = {
  id: '1',
  username: 'Luke',
  email: 'jedimasta@republic.com',
  password: 'may4',
};

// express app
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use((req, res, next) => {
  req.parsedCookies = req.cookies;
  // console.log(req.parsedCookies); // eslint-disable-line no-console
  next();
});

app.use((req, res, next) => {
  req.parsedQuery = req.query;
  // console.log(req.parsedQuery); // eslint-disable-line no-console
  next();
});

passport.use('local', new LocalStrategy(
  {
    session: false,
  },
  (username, password, done) => {
    (testUser.userName !== username
      && testUser.password !== password)
      ? done(null, false, 'bad username')
      : done(null, testUser);
  },
));

passport.use(new GoogleStrategy(
  // options
  {
    clientID: '970345543056-qmlgjq9eg66re5jfe4r2jt98r285go3n.apps.googleusercontent.com',
    clientSecret: 'hOOMreWTTzLlItufGA-jab0a',
    callbackURL: '/auth/google/redirect',
  },
  // callback for future features
  () => { }
));

app.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to the Todos API!',
}));

app.post('/api/users', usersController.create);

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

// passport local auth route
app.post(
  '/auth',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    res.send('authenticated');
  },
);

// passport google auth route
app.get(
  '/auth/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile']
  })
);
// google redirect
app.get(
  '/auth/google/redirect',
  (req, res) => {
    res.send('authenticated with google');
  });

module.exports = app;

// export DATABASE_URL=postgres://wiwzedqf:BWZlKNfTGPVCXaNMO1NAENDHx2ezfjIc@tantor.db.elephantsql.com:5432/wiwzedqf
