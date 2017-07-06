let base = require('./build/webpack.config.base');
let dev = require('./build/webpack.config.dev');

let debug = ['dev'].indexOf(process.env.NODE_ENV) != -1;

module.exports = debug ? dev : base;
