const { statusNotAuthorized } = require('./errorCodes');

class NoAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusNotAuthorized;
  }
}

module.exports = NoAuthorizedError;
