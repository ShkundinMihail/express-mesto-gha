const express = require('express');

const userRoutes = express.Router();
const {
  getUsers,
  getUserID,
  getUserInfo,
  editUserProfile,
  editUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/me', getUserInfo);

userRoutes.get('/:_id', getUserID);

userRoutes.patch('/me', editUserProfile);

userRoutes.patch('/me/avatar', editUserAvatar);

module.exports = userRoutes;
