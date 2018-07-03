'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const usersController = require('./controllers').users;
const productsController = require('./controllers').products;


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
  console.log(req.parsedCookies); // eslint-disable-line no-console
  next();
});

app.use((req, res, next) => {
  req.parsedQuery = req.query;
  console.log(req.parsedQuery); // eslint-disable-line no-console
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
  () => { },
));

// routes
app.get('/', (req, res) => {
  res.end('hello express');
});

app.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to the API!',
}));

app.post('/api/users', usersController.create);
app.get('/api/users', usersController.list);
app.post('/api/users/:userId/products', productsController.create);
app.get('/api/users/:userId', usersController.retrieve);
app.put('/api/users/:userId', usersController.update);
app.delete('/api/users/:userId', usersController.destroy);

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
    scope: ['profile'],
  }),
);
// google redirect
app.get(
  '/auth/google/redirect',
  (req, res) => {
    res.send('authenticated with google');
  },
);


app.listen(8080, () => console.log('SQL app Listening on port 8080'));

module.exports = app;
