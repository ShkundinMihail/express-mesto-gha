const { STATUS_ERROR_SERVER_500 } = require('../errors/errorCodes');

const errorsMiddleware = (err, req, res, next) => {
  const { statusCode = STATUS_ERROR_SERVER_500, message } = err;
  res.status(statusCode).send({ message: statusCode === STATUS_ERROR_SERVER_500 ? 'error Server' : message });
  next();
};

module.exports = {
  errorsMiddleware,
};
