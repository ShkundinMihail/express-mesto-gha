const cardSchema = require('../models/Card');
const { processingGoodResponse, processingError } = require('../handlers/responseHandlers');

const getCards = (req, res) => {
  cardSchema.find().then((cards) => {
    res.send({ data: cards });
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
    .then((card) => { processingGoodResponse(card, res); })
    .catch((err) => processingError(res, err));
};
const likeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => { processingGoodResponse(card, res); })
    .catch((err) => processingError(res, err));
};
const dislikeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => { processingGoodResponse(card, res); })
    .catch((err) => processingError(res, err));
};
module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
