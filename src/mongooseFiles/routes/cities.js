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
router.post('/', (req, res) => {
  const city = new Cities();
  city.country = req.body.country;
  city.name = req.body.name;
  city.capital = req.body.capital;
  city.location.lat = req.body.location_lat;
  city.location.lng = req.body.location_lng;
  city.save((error, city) => {
    if (error) console.log(error);
    res.send(city);
  });
});

// PUT
router.put('/:id', (req, res) => {
  Cities.findByIdAndUpdate(
    req.params.id, req.body, { new: true }, (error, city) => {
      if (error) console.log(error);
      res.send(city);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  Cities.findByIdAndRemove(
    req.params.id, (error, city) => {
      if (error) console.log(error);
      res.send('City removed');
    });
});


module.exports = router;
