'use strict';

const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const indexStream = fs.createReadStream('index.html');

const server = http.createServer();
server.on('request', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  indexStream.pipe(res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
