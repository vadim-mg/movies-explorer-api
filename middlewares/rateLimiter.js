const rateLimit = require('express-rate-limit');
const config = require('../utils/config');

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: config.maxRateLimit, // limit each IP to maxRateLimit requests per windowMs
});
