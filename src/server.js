// Adding babel support
require('babel-register');
require('babel-polyfill');
// Running the app
const app = require('./app');
module.exports = app;

