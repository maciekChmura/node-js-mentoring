'use strict';

const { Router } = require('express');
const Users = require('../models/user');

const router = Router();

// GET
router.get('/', (req, res) => {
  res.send('hello Users');
});

// POST
router.post('/', (req, res) => {

})

module.exports = router;
