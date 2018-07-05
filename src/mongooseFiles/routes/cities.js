'use strict';

const { Router } = require('express');
const { getRandomItem } = require('../../helpers');
const Cities = require('../models/city');

const router = Router();

// GET
router.get('/', (req, res) => {
  res.send('hello Cities');
});

// GET random city
router.get('/randomCity', (req, res) => {
  Cities.find({}, (error, cities) => {
    if (error) {
      console.log(error);
    } else {
      res.send(getRandomItem(cities));
    }
  });
});

module.exports = router;
