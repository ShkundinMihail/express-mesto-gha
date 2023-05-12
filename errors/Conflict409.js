const { statusConflict } = require('./errorCodes');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusConflict;
  }
}

module.exports = Conflict;
