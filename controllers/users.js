/* eslint-disable no-sequences */
/* eslint-disable max-len */
const UserSchema = require('../models/User');

const processingGoodResponse = (user, res) => {
  if (user) {
    res.status(200).send({ data: user });
  } else {
    res.status(404).send({ message: 'card not found, error 404' });
  }
};
const processingError = (res, err) => {
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'incorrect id, error 400' });
  } else if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((error) => error.message).join(';');
    res.status(400).send({ message });
  } else {
    res.status(500).send({ message: `smth went wrong 500${err}` });
  }
};

const getUsers = (req, res) => {
  UserSchema.find().then((users) => {
    res.status(200).send({ data: users });
  })
    .catch(() => res.status(500).send({ message: 'smth went wrong 500 ' }));
};
const getUser = (req, res) => {
  const id = req.params;
  UserSchema.findById(id)
    .then((user) => { processingGoodResponse(user, res); })
    .catch((err) => { processingError(res, err); });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  UserSchema.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => { processingError(res, err); });
};
const editUserProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id: userId } = req.user;
  UserSchema.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => { processingGoodResponse(user, res); })
    .catch((err) => { processingError(res, err); });
};
const editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id: userId } = req.user;
  UserSchema.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => { processingGoodResponse(user, res); })
    .catch((err) => { processingError(res, err); });
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  editUserProfile,
  editUserAvatar,
};
