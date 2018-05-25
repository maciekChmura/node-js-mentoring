'use strict';

const { FILE_CHANGED, FILE_DELETED } = require('./constants');
const DirWatcher = require('./dirWatcher');

console.log('test');
module.exports = {
  FILE_CHANGED,
  FILE_DELETED,
  DirWatcher,
};
