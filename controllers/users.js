// const {
//   ValidationError,
//   DocumentNotFoundError,
//   CastError,
// } = require('mongoose').Error;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/User');
const IncorrectValue = require('../errors/IncorrectValue400');
const NotFound = require('../errors/NotFound404');
const Conflict = require('../errors/Conflict409');
const { STATUS_CREATED_201 } = require('../errors/errorCodes');

const getUsers = (req, res, next) => {
  UserSchema.find().then((users) => {
    res.send({ data: users });
  })
    .catch(next);
};
const getUserID = (req, res, next) => {
  const { _id: userId } = req.params;
  UserSchema.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('user not found');
      } else {
        res.send({ user });
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

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  UserSchema.findById(userId)
    .then((user) => res.send(user))
    .catch(next);
};

const editUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id: userId } = req.user;
  UserSchema.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('user not found');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFound('user not found'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new IncorrectValue('incorrect value'));
      } else {
        next(err);
      }
    });
};

const editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id: userId } = req.user;
  UserSchema.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('user not found');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFound('user not found'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new IncorrectValue('incorrect value'));
      } else {
        next(err);
      }
    });
};
const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => UserSchema.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.status(STATUS_CREATED_201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('user already exists'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new IncorrectValue('incorrect value'));
      } else {
        next(err);
      }
    });
};
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return UserSchema.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 10000000000, httpOnly: true }).send({ message: 'goodBoy' });
    })
    .catch(next);
};
module.exports = {
  getUsers,
  getUserID,
  getUserInfo,
  createUser,
  editUserProfile,
  editUserAvatar,
  loginUser,
};
