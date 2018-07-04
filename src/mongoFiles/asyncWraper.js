'use strict';

module.exports = handler => (req, res, next) => Promise
  .resolve(handler(req, res, next))
  .catch(e => res.error(e));
