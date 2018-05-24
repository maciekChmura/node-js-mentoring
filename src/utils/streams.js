'use strict';

const fs = require('fs');
const fsPromises = require('fs/promises');
const program = require('commander');
const csvjson = require('csvjson');
const axios = require('axios');

// example url with css file for css bundler
const url = 'https://gist.githubusercontent.com/eirikbakke/1059266/raw/d81dba46c76169c2b253de0baed790677883c221/gistfile1.css';

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
  read
    .pipe(toObject)
    .pipe(stringify)
    .pipe(process.stdout);
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
  read
    .pipe(toObject)
    .pipe(stringify)
    .pipe(write);
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
  const fileData = await readFile(dirPath, filesInDir);
  const data = await Promise.all(fileData);

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
  .version('0.1.0', '-v --version')
  .option('-r --reverse <str>', 'reverse a string')
  .option('-t --transform <str>', 'transform a string to upper case')
  .option('-o --outputFile <filePath>', 'output file content')
  .option('-c --convertFromFile <filePath>', 'convert file content: csv -> json')
  .option('-f --convertToFile <filePath>', 'convert file content: csv -> json and save to file')
  .option('-b --bundle <filesPath>', 'bundle css files and save to file')
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

if (program.bundle) {
  bundler(program.bundle);
}

if (process.argv.length < 3) {
  console.log('please specify an option:');
  program.help();
}
