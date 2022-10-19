const dev = require('./dev');
const prod = require('./prod');
const local = require('./local');
const config = process.env.NODE_ENV === 'production'
  ? prod
  : (process.env.NODE_ENV === 'development' ? dev : local);
module.exports = config;
