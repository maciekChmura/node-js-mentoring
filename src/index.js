'use strict';

const http = require('http');
const https = require('https');
const fs = require('fs');
const appSQL = require('./app'); // SQL implementation
const appMongo = require('./mongoFiles/app'); // Mongo Driver implementation

const httpsOptions = {
  key: fs.readFileSync('./key.pem', 'utf8'),
  cert: fs.readFileSync('./cert.pem', 'utf8'),
};

const httpsPort = process.env.HTTPSPORT || 8090;
https.createServer(httpsOptions, appSQL).listen(httpsPort);
