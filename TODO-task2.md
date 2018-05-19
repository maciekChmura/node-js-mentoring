## Homework 2
### ASYNC DEVELOPMENT
#### Tasks
* ~~Create a directory called `data`. We will assume that CSV files with new products will be uploaded in this directory for processing by our application.~~
* ~~In your application create a local module called `dirwatcher`. Create class `DirWatcher` that should be able to watch a given path with a given delay and emit a `changed` event if directory contents have been changed (implement method `watch(path, delay)` by yourself, try not to use native `fs.watch()`).~~
  * ~~When the path is checked for the first time all files should be treated as new.~~
* ~~Create a module called `importer`. Create class `Importer`. It should be able to listen to `DirWatcher` events and start importing CSV files (converting the data to JavaScript objects) on `dirwatcher:changed` event.~~
  * ~~Implement `import(path)`: should return a promise with imported data from file at `path`.~~
  * ~~Implement `importSync(path)`: should be synchronous and return all imported data from file at `path`.~~
* ~~In app.js:~~
  * ~~Import all of the above modules.~~
  * ~~Create a `Dirwatcher` and `Importer` for processing files asynchronously from `data` directory.~~
  * ~~Log imported data to console.~~


Note: every CSV file in a directory should be processed only once.
Note: feel free to use already implemented library for transforming CSV into JSON.

#### Criteria for evaluation
* CSV files are placed in appropriate directory.
* `DirWatcher` module is implemented and matches described criteria.
* `Importer` module is implemented and matches described criteria.
* Application logic is implemented for a fixed (predefined) number of CSV files.
* Application logic is implemented for arbitrary number of CSV files (all tasks and subtasks are implemented properly) which could be added/changed/removed at any time.
