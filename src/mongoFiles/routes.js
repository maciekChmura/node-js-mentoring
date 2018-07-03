'use strict';

const getRandomItem = array => array[Math.floor(Math.random() * array.length)];

const routes = (app, dbs) => {
  app.get('/', (req, res) => {
    dbs.collection('cities').find({}).toArray((err, docs) => {
      if (err) {
        console.log(err);
        res.error(err);
      } else {
        res.json(getRandomItem(docs));
      }
    });
  });
  return app;
};

module.exports = routes;
