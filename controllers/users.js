const UserSchema = require('../models/User');
const { processingError, processingGoodResponse } = require('../handlers/responseHandlers');

const getUsers = (req, res) => {
  UserSchema.find().then((users) => {
    res.send({ data: users });
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
