const express = require('express');

const cardRoutes = express.Router();

// eslint-disable-next-line object-curly-newline
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

cardRoutes.get('/', getCards);

cardRoutes.post('/', createCard);

cardRoutes.delete('/:id', deleteCard);

cardRoutes.put('/:cardId/likes', likeCard);

cardRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = cardRoutes;
