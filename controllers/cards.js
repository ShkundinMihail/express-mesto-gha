const cardSchema = require('../models/Card');

const processingError = (res, err) => {
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'incorrect id, error 400' });
  } else if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((error) => error.message).join(';');
    res.status(400).send({ message });
  } else if (err.message === 'not_found') {
    res.status(400).send({ message: 'card not found, error 400' });
  } else {
    res.status(500).send({ message: 'smth went wrong 500' });
  }
};
const getCards = (req, res) => {
  cardSchema.find().then((cards) => {
    res.status(200).send({ data: cards });
  })
    .catch((err) => processingError(res, err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id: userId } = req.user;
  cardSchema.create({ name, link, owner: userId })
    .then((card) => { res.status(201).send({ data: card }); })
    .catch((err) => processingError(res, err));
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  cardSchema.findByIdAndRemove(id)
    .then((card) => res.send({ data: card }))
    .catch((err) => processingError(res, err));
};
const likeCard = (req, res) => {
  // eslint-disable-next-line max-len
  cardSchema.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => { res.status(201).send({ data: card }); })
    .catch((err) => processingError(res, err));
};
const dislikeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => { res.status(200).send({ data: card }); })
    .catch((err) => processingError(res, err));
};
module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
