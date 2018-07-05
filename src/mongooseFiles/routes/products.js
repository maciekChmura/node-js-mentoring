'use strict';

const { Router } = require('express');
const Products = require('../models/product');

const router = Router();

// GET
router.get('/', (req, res) => {
  res.send('hello Products');
});



module.exports = router;
