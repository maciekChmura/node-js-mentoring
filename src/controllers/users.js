'use strict';

const { User } = require('../models');
const { Product } = require('../models');

const checkUser = (user) => {
  if (!user) throw new Error('User Not Found');
};

module.exports = {
  create: (req, res) => User
    .create({
      title: req.body.title,
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error.message)),

  list: (req, res) => User
    .findAll({
      include: [{
        model: Product,
        as: 'products',
      }],
    })
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error.message)),

  retrieve: (req, res) => User
    .findById(req.params.userId, {
      include: [{
        model: Product,
        as: 'products',
      }],
    })
    .then((user) => {
      checkUser(user);
      return res.status(200).send(user);
    })
    .catch(error => res.send(error.message)),

  update: (req, res) => User
    .findById(req.params.userId, {
      include: [{
        model: Product,
        as: 'products',
      }],
    })
    .then((user) => {
      checkUser(user);
      return user
        .update({
          title: req.body.title || user.title,
        })
        .then(() => res.status(200).send(user)) // Send back the updated user.
        .catch(error => res.status(400).send(error.message));
    })
    .catch(error => res.status(400).send(error.message)),

  destroy: (req, res) => User
    .findById(req.params.userId)
    .then((user) => {
      checkUser(user);
      return user
        .destroy()
        .then(() => res.status(200).send({ message: 'User deleted successfully.' }))
        .catch(error => res.status(400).send(error.message));
    })
    .catch(error => res.status(400).send(error.message)),
};
