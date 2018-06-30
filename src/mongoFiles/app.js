'use strict';

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const URI = 'mongodb://luke:4qwerty@ds217921.mlab.com:17921/node-mentoring';

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

const getCities = () => new Promise((resolve, reject) => {
  MongoClient.connect(
    URI,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) reject(error);

      const db = client.db('node-mentoring');

      db.collection('cities').find().toArray((error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    },
  );
});

app.get('/', (req, res) => {
  getCities()
    .then(cities => getRandomItem(cities))
    .then(city => res.status(201).send(city))
    .catch(error => res.status(400).send(error.message));
});

module.exports = app;
