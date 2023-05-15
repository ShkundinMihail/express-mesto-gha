const jwt = require('jsonwebtoken');
const NoAuthorizedError = require('../errors/NoAuthorized401');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new NoAuthorizedError('Authorization required'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new NoAuthorizedError('Authorization required'));
  }

  req.user = payload;

  return next();
};
