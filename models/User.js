const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'name must be between 2 and 30 characters',
      },
    },
    about: {
      type: String,
      default: 'Исследователь океана',
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'about must be between 2 and 30 characters',
      },
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i.test(url),
        message: 'enter URL',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(email),
        message: 'enter email',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: ({ length }) => length >= 6,
        message: ' password must consist of 8 or more characters',
      },
    },
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('incorrect email or password'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
