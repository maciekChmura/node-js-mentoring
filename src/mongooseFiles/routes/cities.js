'use strict';

const { Router } = require('express');
const { getRandomItem, asyncWrapper } = require('../../helpers');
const City = require('../models/city');

const router = Router();

// GET
router.get('/', asyncWrapper((req, res) => City
  .find({})
  .then(cities => res.send(cities))));

// GET random city
router.get('/randomCity', asyncWrapper((req, res) => City
  .find({})
  .then(cities => res.send(getRandomItem(cities)))));

// POST
router.post('/', asyncWrapper(({ body }, res) => new City(body)
  .save()
  .then(city => res.send(city))));

// PUT
router.put('/:id', asyncWrapper((req, res) => City
  .findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(city => res.send(city))));

// DELETE
router.delete('/:id', asyncWrapper((req, res) => City
  .findByIdAndRemove(req.params.id)
  .then(res.send('City removed'))));

module.exports = router;
