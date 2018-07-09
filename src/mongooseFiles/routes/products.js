'use strict';

const { Router } = require('express');
const Product = require('../models/product');
const { asyncWrapper } = require('../../helpers');

const router = Router();

// GET
router.get('/', asyncWrapper((req, res) => Product
  .find({})
  .then(products => res.send(products))));


router.get('/:id', asyncWrapper((req, res) => Product
  .findById(req.params.id)
  .then(product => res.send(product))));

// POST
router.post('/', asyncWrapper(({ body }, res) => new Product(body)
  .save()
  .then(product => res.send(product))));

// DELETE
router.delete('/:id', asyncWrapper((req, res) => Product
  .findByIdAndRemove(req.params.id)
  .then(product => res.send('Product removed'))));

module.exports = router;
