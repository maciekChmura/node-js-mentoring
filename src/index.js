'use strict';

const http = require('http');
const https = require('https');
const fs = require('fs');
// const appSQL = require('./app'); // SQL implementation
// const appMongo = require('./mongoFiles/app'); // Mongo Driver implementation
const appMongoose = require('./mongooseFiles/app');

const PORT = process.env.PORT || 5000;

// const httpsOptions = {
//   key: fs.readFileSync('./key.pem', 'utf8'),
//   cert: fs.readFileSync('./cert.pem', 'utf8'),
// };

// const httpsPort = process.env.HTTPSPORT || 8090;
// https.createServer(httpsOptions, appSQL).listen(httpsPort);

// start server
appMongoose.listen(PORT, () => console.log(`Mongoose app Listening on port ${PORT}`));
