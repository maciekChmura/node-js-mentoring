'use strict';

const { Product } = require('../models');

module.exports = {
  create: (req, res) => Product
    .create({
      content: req.body.content,
      userId: req.params.userId,
    })
    .then(product => res.status(201).send(product))
    .catch(error => res.status(400).send(error.message)),
};
