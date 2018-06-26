'use strict';

var express = require('express');
var router = express.Router();

const usersController = require('../controllers').users;

router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to the Users API!',
}));

router.post('/api/users', usersController.create);

module.exports = router;

