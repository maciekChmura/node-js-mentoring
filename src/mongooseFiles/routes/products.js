'use strict';

const { Router } = require('express');
const Products = require('../models/product');

const router = Router();

// GET
router.get('/', (req, res) => {
  Products.find({}, (error, products) => {
    if (error) {
      console.log(error);
    } else {
      res.send(products);
    }
  });
});

router.get('/:id', (req, res) => {
  Products.findById(req.params.id, (error, product) => {
    if (error) {
      console.log(error);
    } else {
      res.send(product);
    }
  });
});

// POST
router.post('/', (req, res) => {
  const product = new Products();
  product.name = req.body.name;
  product.weight = req.body.weight;
  product.save((error, product) => {
    if (error) console.log(error);
    res.send(product);
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  Products.findByIdAndRemove(
    req.params.id, (error, product) => {
      if (error) console.log(error);
      res.send('Product removed');
    });
});


module.exports = router;
