'use strict';

const fs = require('fs');
const fsPromises = require('fs').promises;
const program = require('commander');
const csvjson = require('csvjson');
const axios = require('axios');

// example url with css file for css bundler
const url = 'https://gist.githubusercontent.com/eirikbakke/1059266/raw/d81dba46c76169c2b253de0baed790677883c221/gistfile1.css';

// I/O functions
const readStream = (filePath) => {
  const read = fs.createReadStream(filePath, 'utf8');
  read.on('error', err => console.log(`reading error: ${err}`));
  return read;
};

const writeStream = (filePath) => {
  const fileName = filePath.replace(/^.*[\\\/]/, '').slice(0, -4);
  const path = filePath.replace(/(.*?)[^\\/]*\..*$/, '$1');
  const write = fs.createWriteStream(`${path}${fileName}.json`);
  write.on('error', err => console.log(`writing error: ${err}`));
  write.on('close', () => console.log(`file saved to: ${path}${fileName}.json`));
  return write;
};
// stream helpers
const toObject = csvjson.stream.toObject();
const stringify = csvjson.stream.stringify();

// action functions
const reverse = string => string.split('').reverse().join('');

const transform = string => string.toUpperCase();

const outputFile = (readStr, writeStr) => {
  readStr.pipe(writeStr);
};

const convertFromFile = (readStr, writeStr) => {
  readStr
    .pipe(toObject)
    .pipe(stringify)
    .pipe(writeStr);
};

// logic same as convertFromFile
// could be removed, but required in homework3 spec.
const convertToFile = (readStr, writeStr) => {
  readStr
    .pipe(toObject)
    .pipe(stringify)
    .pipe(writeStr);
};

// CSS Bundler

const readDir = async (dirPath) => {
  return fsPromises.readdir(dirPath);
};

const readFile = async (dirPath, fileNames) => {
  return fileNames.map(fileName => fsPromises.readFile(`${dirPath}/${fileName}`));
};

const readFileFromURL = async (fileUrl) => {
  try {
    const response = await axios.get(fileUrl);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const bundler = async (dirPath) => {
  // read Dir
  const filesInDir = await readDir(dirPath);

  // read Files from Dir
  const filesData = await readFile(dirPath, filesInDir);
  const data = await Promise.all(filesData);

  // read CSS from URL
  const fileFromURL = await readFileFromURL(url);

  // concat files
  data.push(fileFromURL);
  const dataString = data.join('').toString();

  // save bundle to disk
  const writeStream = fs.createWriteStream(`${dirPath}/_bundle.css`);
  writeStream.write(dataString);
  writeStream.on('error', err => console.log(err));
  writeStream.on('close', () => console.log(`file saved to: ${dirPath}/_bundle.css`));
  writeStream.end();
};

// handling CLI
program
  .version('0.1.0', '-v, --version')
  .option('-r, --reverse <str>', 'reverse a string')
  .option('-t, --transform <str>', 'transform a string to upper case')
  .option('-o, --outputFile <filePath>', 'output file content')
  .option('-c, --convertFromFile <filePath>', 'convert file content: csv -> json and show output')
  .option('-f, --convertToFile <filePath>', 'convert file content: csv -> json and save to file')
  .option('-b, --bundle <filesPath>', 'bundle css files and save to file')
  .parse(process.argv);

if (program.reverse) {
  console.log(reverse(program.reverse));
}

if (program.transform) {
  console.log(transform(program.transform));
}

if (program.outputFile) {
  outputFile(readStream(program.outputFile), process.stdout);
}

if (program.convertFromFile) {
  convertFromFile(readStream(program.convertFromFile), process.stdout);
}

if (program.convertToFile) {
  convertToFile(readStream(program.convertToFile), writeStream(program.convertToFile));
}

if (program.bundle) {
  bundler(program.bundle);
}

if (process.argv.length < 3) {
  console.log('please specify an option:');
  program.help();
}
