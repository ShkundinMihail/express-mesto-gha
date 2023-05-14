const express = require('express');

const cardRoutes = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { createCardValidation, cardIdValidation } = require('../validationJoy/validationCard');

cardRoutes.get('/', getCards);

cardRoutes.post('/', createCardValidation, createCard);

cardRoutes.delete('/:cardId', cardIdValidation, deleteCard);

cardRoutes.put('/:cardId/likes', cardIdValidation, likeCard);

cardRoutes.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cardRoutes;
