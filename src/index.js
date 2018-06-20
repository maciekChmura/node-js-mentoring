'use strict';

const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');

const httpsOptions = {
  key: fs.readFileSync('./csr.pem'),
  cert: fs.readFileSync('./server.crt'),
};

const port = process.env.PORT || 8080;
const httpsPort = process.env.HTTPSPORT || 443;
http.createServer(app).listen(port);
https.createServer(httpsOptions, app).listen(httpsPort);

