const { STATUS_FORBIDDEN_403 } = require('./errorCodes');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_FORBIDDEN_403;
  }
}

module.exports = Forbidden;
