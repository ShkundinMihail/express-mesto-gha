const { STATUS_NOT_FOUND_404 } = require('./errorCodes');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_NOT_FOUND_404;
  }
}

module.exports = NotFound;
