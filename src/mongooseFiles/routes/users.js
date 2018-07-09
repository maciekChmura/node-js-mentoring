'use strict';

const { Router } = require('express');
const User = require('../models/user');
const { asyncWrapper } = require('../../helpers');

const router = Router();

// GET
router.get('/', asyncWrapper((req, res) => User
  .find({})
  .then(users => res.send(users))));

// POST
router.post('/', asyncWrapper(({ body }, res) => new User(body)
  .save()
  .then(user => res.send(user))));

// DELETE
router.delete('/:id', asyncWrapper((req, res) => User
  .findByIdAndRemove(req.params.id)
  .then(user => res.send('User removed'))));

module.exports = router;
