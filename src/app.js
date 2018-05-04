const config = require('./config/config');
const User = require('./models/User');
const Product = require('./models/Product');
const DirWatcher = require('./dirwatcher');
const Importer = require('./importer');

console.log(config.name);

const product = new Product();
const user = new User();

const dirWatcher = new DirWatcher();
const importer = new Importer(dirWatcher);

dirWatcher.watch('./data', 1000);
