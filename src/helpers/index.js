'use strict';

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

const asyncWrapper = handler => (req, res, next) => Promise
  .resolve(handler(req, res, next))
  .catch(e => res.error(e));

module.exports = {
  getRandomItem,
  asyncWrapper,
};
