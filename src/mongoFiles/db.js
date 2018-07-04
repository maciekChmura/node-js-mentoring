'use strict';

const { MongoClient } = require('mongodb');

const URI = 'mongodb://luke:4qwerty@ds217921.mlab.com:17921/node-mentoring';

function connect(url) {
  return MongoClient.connect(url, { useNewUrlParser: true }).then(client => client.db('node-mentoring'));
}

const db = async () => {
  const database = await Promise.resolve(connect(URI));
  return database;
};

module.exports = db;
