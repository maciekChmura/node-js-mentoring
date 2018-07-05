'use strict';

const { Router } = require('express');
const { getRandomItem } = require('../../helpers');
const Cities = require('../models/city');

const router = Router();

// GET
router.get('/', (req, res) => {
  Cities.find({}, (error, cities) => {
    if (error) {
      console.log(error);
    } else {
      res.send(cities);
    }
  });
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

// POST
router.post('/a', (req, res) => {
  const city = new Cities();
  city.country = req.body.country;
  Cities.save();
});

module.exports = router;
