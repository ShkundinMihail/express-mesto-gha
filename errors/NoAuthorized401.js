const { STATUS_NOT_AUTHRIZED_401 } = require('./errorCodes');

class NoAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_NOT_AUTHRIZED_401;
  }
}

module.exports = NoAuthorizedError;
