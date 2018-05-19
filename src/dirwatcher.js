'use strict';

const fsPromises = require('fs/promises');
const { EventEmitter } = require('events');

class DirWatcher extends EventEmitter {
  constructor() {
    super();
    this.path = '';
    this.directoryContents = new Map();
    this.newDirectoryContents = new Map();
    this.filesInDir = [];
  }

  static async readDir(path) {
    return fsPromises.readdir(path);
  }

  static async readStats(path, fileNames) {
    return fileNames.map(fileName => fsPromises.stat(`${path}/${fileName}`));
  }

  async saveState(path) {
    // read dir file names
    this.filesInDir = await DirWatcher.readDir(path);

    // read stats
    const stats = await DirWatcher.readStats(path, this.filesInDir);
    const statsResolved = await Promise.all(stats);

    // save stats to dir contents
    return this.filesInDir.map((file, index) => (
      [file, Number(statsResolved[index].mtime)]));
  }

  async watch(path, delay) {
    this.path = path;
    this.directoryContents = new Map([...await this.saveState(path)]);

    // emit data change for first load if there is data:
    if (this.directoryContents.size > 0) {
      this.emit('data change', this.filesInDir);
    }

    // loop
    const run = async () => {
      this.newDirectoryContents = new Map([...await this.saveState(path)]);

      // check for deleted files
      const deletedFiles = [...this.directoryContents.keys()]
        .filter(key => !this.newDirectoryContents.has(key));
      if (deletedFiles.length > 0) {
        this.emit('file deleted', deletedFiles);
      }

      // check for new files
      const newFiles = [...this.newDirectoryContents.keys()]
        .filter(key => !this.directoryContents.has(key));
      if (newFiles.length > 0) {
        this.emit('data change', newFiles);
      }

      // check for modified files
      const modifiedFiles = [...this.newDirectoryContents.keys()]
        .filter(key => this.directoryContents.has(key))
        .filter(key => this.newDirectoryContents.get(key) !== this.directoryContents.get(key));
      if (modifiedFiles.length > 0) {
        this.emit('data change', modifiedFiles);
      }

      // 5. update state with new data
      this.directoryContents = this.newDirectoryContents;
      setTimeout(run, delay);
    };
    setTimeout(run, delay);
  }

  getPath() {
    return this.path;
  }
}

module.exports = DirWatcher;
