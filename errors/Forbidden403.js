const { statusForbidden } = require('./errorCodes');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusForbidden;
  }
}

module.exports = Forbidden;
