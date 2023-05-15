const { STATUS_INCORRECT_VALUE_400 } = require('./errorCodes');

class IncorrectValue extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_INCORRECT_VALUE_400;
  }
}

module.exports = IncorrectValue;
