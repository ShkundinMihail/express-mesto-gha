// const { ValidationError, CastError } = require('mongoose').Error;

const cardSchema = require('../models/Card');
const IncorrectValue = require('../errors/IncorrectValue400');
const Forbidden = require('../errors/Forbidden403');
const NotFound = require('../errors/NotFound404');
const { STATUS_CREATED_201 } = require('../errors/errorCodes');

const getCards = (req, res, next) => {
  cardSchema.find()
    .then((cards) => { res.send(cards); })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: userId } = req.user;
  cardSchema.create({ name, link, owner: userId })
    .then((card) => { res.status(STATUS_CREATED_201).send({ data: card }); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectValue('incorrect value'));
      } else {
        next(err);
      }
    });
};
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = String(req.user._id);
  cardSchema.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFound('not found card'));
      } else if (userId !== card.owner.toString()) {
        next(new Forbidden('no right to delete card'));
      } else {
        cardSchema.findByIdAndRemove(cardId)
          .then(() => {
            res.send(card);
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectValue('incorrect value'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  cardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('not found card');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectValue('incorrect value'));
      } else {
        next(err);
      }
    });
};
const dislikeCard = (req, res, next) => {
  cardSchema.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('not found card');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectValue('incorrect value'));
      } else {
        next(err);
      }
    });
};
module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
