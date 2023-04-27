/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
const express = require('express');

const userRoutes = express.Router();
const { getUsers, getUser, createUser, editUserProfile, editUserAvatar} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/:_id', getUser);

userRoutes.post('/', createUser);

userRoutes.patch('/me', editUserProfile);

userRoutes.patch('/me/avatar', editUserAvatar);

module.exports = userRoutes;
