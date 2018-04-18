import config from './config/config';
import User from './models/User';
import Product from './models/Product';

console.log(config.name);

const product = new Product();
const user = new User();
