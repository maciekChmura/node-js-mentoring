'use strict';

const User = require('../models').User;

module.exports = {
  create(req, res) {
    console.log(req.body.title);
    return User
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
};
