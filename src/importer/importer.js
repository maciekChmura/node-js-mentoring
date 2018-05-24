'use strict';

const fs = require('fs');
const fsPromises = require('fs/promises');
const csvjson = require('csvjson');
const { FILE_CHANGED, FILE_DELETED } = require('../dirWatcher/constants');

class Importer {
  constructor() {
    this.path = '';
    this.filesToImport = [];
  }

  async readFile(fileName) {
    return fsPromises.readFile(`${this.path}/${fileName}`, 'utf8');
  }

  async import(files) {
    const filesData = await Promise.all(files.map(file => this.readFile(file)));
    return filesData.map(data => csvjson.toObject(data));
  }

  importSync(files) {
    return files
      .map(file => fs.readFileSync(`${this.path}/${file}`, { encoding: 'utf8' }))
      .map(file => csvjson.toObject(file));
  }

  listen(dirWatcher) {
    this.path = dirWatcher.getPath();
    dirWatcher.on(FILE_CHANGED, async (files) => {
      const data = await this.import(files);
      // const data = this.importSync(files);
      console.log(data);
    });
    dirWatcher.on(FILE_DELETED, files => console.log(`files deleted: ${files}`));
  }
}

module.exports = Importer;
