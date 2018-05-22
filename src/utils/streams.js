'use strict';

const fs = require('fs');
const program = require('commander');
const csvjson = require('csvjson');

// action functions
const reverse = (str) => {
  console.log(str.split('').reverse().join(''));
};

const transform = (str) => {
  console.log(str.toUpperCase());
};

const outputFile = (filePath) => {
  const read = fs.createReadStream(filePath, 'utf8');
  read.on('error', err => console.log(`reading error: ${err}`));
  read.pipe(process.stdout);
};

const convertFromFile = (filePath) => {
  const read = fs.createReadStream(filePath, 'utf8');
  read.on('error', err => console.log(`reading error: ${err}`));
  const toObject = csvjson.stream.toObject();
  const stringify = csvjson.stream.stringify();
  read.pipe(toObject).pipe(stringify).pipe(process.stdout);
};

const convertToFile = (filePath) => {
  const read = fs.createReadStream(filePath, 'utf8');
  read.on('error', err => console.log(`reading error: ${err}`));
  const fileName = filePath.replace(/^.*[\\\/]/, '').slice(0, -4);
  const path = filePath.replace(/(.*?)[^\\/]*\..*$/, '$1');
  const write = fs.createWriteStream(`${path}${fileName}.json`);
  write.on('error', err => console.log(`writing error: ${err}`));
  write.on('close', () => console.log(`file saved at: ${path}${fileName}.json`));
  const toObject = csvjson.stream.toObject();
  const stringify = csvjson.stream.stringify();
  read.pipe(toObject).pipe(stringify).pipe(write);
};


// handling CLI
program
  .version('0.1.0', '-v --version')
  .option('-r --reverse <str>', 'reverse a string')
  .option('-t --transform <str>', 'transform a string to upper case')
  .option('-o --outputFile <filePath>', 'output file content')
  .option('-c --convertFromFile <filePath>', 'output file content')
  .option('-f --convertToFile <filePath>', 'output file content to a file')
  .parse(process.argv);

if (program.reverse) {
  reverse(program.reverse);
}

if (program.transform) {
  transform(program.transform);
}

if (program.outputFile) {
  outputFile(program.outputFile);
}

if (program.convertFromFile) {
  convertFromFile(program.convertFromFile);
}

if (program.convertToFile) {
  convertToFile(program.convertToFile);
}

if (process.argv.length < 3) {
  console.log('please specify some arguments:');
  program.help();
}
