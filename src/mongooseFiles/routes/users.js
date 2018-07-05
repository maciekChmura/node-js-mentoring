'use strict';

const { Router } = require('express');
const { getRandomItem } = require('../../helpers');
const Users = require('../models/user');

const router = Router();

// GET
router.get('/', (req, res) => {
  res.send('hello Users');
});



module.exports = router;
