const fs = require('fs');
const path = require('path');
const util = require('util');
const EventEmitter = require('events').EventEmitter;

let directoryContents = [];

class DirWatcher extends EventEmitter {
  constructor() {
    super();
  }
  watch(path, delay) {
    //first time check -> load all files
    fs.readdir(path, (err, files) => {
      if (err) {
        console.log(err);
      };
      directoryContents = files;
      this.emit('data change')
    })
    setInterval(() => {
      let newDirectoryContents;
      fs.readdir(path, (err, files) => {
        if (err) {
          console.log(err);
        };
        newDirectoryContents = files;
        //check for new files in folder
        if (directoryContents.length !== newDirectoryContents.length) {
          this.emit('data change')
        } else {
          this.emit('no change')
        }
        //update directory content state
        directoryContents = newDirectoryContents;
      })
    }, delay)
  }
}

module.exports = DirWatcher;