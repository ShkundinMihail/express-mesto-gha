const { statusIncorrectValue } = require('./errorCodes');

class IncorrectValue extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusIncorrectValue;
  }
}

module.exports = IncorrectValue;
