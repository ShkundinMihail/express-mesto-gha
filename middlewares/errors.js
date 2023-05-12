const { statusErrorServer } = require('../errors/errorCodes');

const errorsMiddleware = (err, req, res, next) => {
  const { statusCode = statusErrorServer, message } = err;
  res.status(statusCode).send({ message: statusCode === statusErrorServer ? 'error Server' : message });
  next();
};

module.exports = {
  errorsMiddleware,
};
