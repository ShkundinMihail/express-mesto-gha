/* eslint-disable no-sequences */
/* eslint-disable max-len */
const UserSchema = require('../models/User');

const getUsers = (req, res) => {
  UserSchema.find().then((users) => {
    res.status(200).send({ data: users });
  })
    .catch(() => res.status(500).send({ message: 'smth went wrong 500 ' }));
};
const getUser = (req, res) => {
  const id = req.params;
  UserSchema.findById(id)
    .orFail(() => {
      throw new Error('not_found');
    })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        res.status(404).send({ message: 'user not found, error 404' });
      }
    })
    .catch((err) => {
      if (err.message === 'not_found') {
        res.status(400).send({ message: 'user not found, error 400' });
      } else {
        res.status(500).send({ message: `smth went wrong 500${err}` });
      }
    });
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  UserSchema.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      //  console.log(err);
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.message).join(';');
        res.status(400).send({ message });
      } else {
        res.status(500).send({ message: 'smth went wrong 500' });
      }
    });
};
const editUserProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id: userId } = req.user;
  // console.log(name, about);
  UserSchema.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      // console.log(`49_${err.name}`);
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.message).join(';');
        res.status(400).send({ message });
      } else if (err.message === 'not_found') {
        res.status(404).send({ message: 'user not found, error 404' });
      } else {
        res.status(500).send({ message: `smth went wrong 500${err}` });
      }
    });
};
const editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id: userId } = req.user;
  UserSchema.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.message).join(';');
        res.status(400).send({ message });
      } else if (err.message === 'not_found') {
        res.status(404).send({ message: 'user not found, error 404' });
      } else {
        res.status(500).send({ message: `smth went wrong 500${err}` });
      }
    });
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  editUserProfile,
  editUserAvatar,
};
