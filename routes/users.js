const express = require('express');

const userRoutes = express.Router();
const {
  getUsers,
  getUserID,
  getUserInfo,
  editUserProfile,
  editUserAvatar,
} = require('../controllers/users');
const {
  getUserIdValidation,
  editUserProfileValidation,
  editUserAvatarValidation,
} = require('../validationJoy/validationUser');

userRoutes.get('/', getUsers);

userRoutes.get('/me', getUserInfo);

userRoutes.get('/:_id', getUserIdValidation, getUserID);

userRoutes.patch('/me', editUserProfileValidation, editUserProfile);

userRoutes.patch('/me/avatar', editUserAvatarValidation, editUserAvatar);

module.exports = userRoutes;
