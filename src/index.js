'use strict';

const http = require('http');
const https = require('https');
const fs = require('fs');
// const app = require('./app'); // SQL implementation
const app = require('./mongoFiles/app'); // Mongo implementation

const httpsOptions = {
  key: fs.readFileSync('./key.pem', 'utf8'),
  cert: fs.readFileSync('./cert.pem', 'utf8'),
};

const port = process.env.PORT || 8080;
const httpsPort = process.env.HTTPSPORT || 8081;
// http.createServer(app).listen(port, () => console.log(`server listening on port: ${port}`));
https.createServer(httpsOptions, app).listen(httpsPort);
