const { notFound, incorrectValue, errorServer } = require('./errorCodes');

const processingGoodResponse = (user, res) => {
  if (user) {
    res.send({ data: user });
  } else {
    res.status(notFound).send({ message: 'object not found, error 404' });
  }
};
const processingError = (res, err) => {
  if (err.name === 'CastError') {
    res.status(incorrectValue).send({ message: 'incorrect id, error 400' });
  } else if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((error) => error.message).join(';');
    res.status(incorrectValue).send({ message });
  } else {
    res.status(errorServer).send({ message: 'smth went wrong 500$' });
  }
};

module.exports = { processingError, processingGoodResponse };
