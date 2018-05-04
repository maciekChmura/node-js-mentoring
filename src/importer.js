const EventEmitter = require('events').EventEmitter;

class Importer extends EventEmitter {
  constructor(dirWatcher) {
    super();
    dirWatcher.on('data change', this.startImport)
  }
  startImport() {
    console.log('importing....');
  }
  import(path) {

  }
  importSync(path) {

  }

}

module.exports = Importer;