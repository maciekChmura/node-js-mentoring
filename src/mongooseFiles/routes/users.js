'use strict';

const { Router } = require('express');
const Users = require('../models/user');

const router = Router();

// GET
router.get('/', (req, res) => {
  Users.find({}, (error, users) => {
    if (error) {
      console.log(error);
    } else {
      res.send(users);
    }
  });
});

// POST
router.post('/', (req, res) => {
  const user = new Users();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.save((error, user) => {
    if (error) console.log(error);
    res.send(user);
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  Users.findByIdAndRemove(
    req.params.id, (error, user) => {
      if (error) console.log(error);
      res.send('User removed');
    });
});

module.exports = router;
