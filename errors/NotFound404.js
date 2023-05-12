const { statusNotFound } = require('./errorCodes');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusNotFound;
  }
}

module.exports = NotFound;
