const mongoose = require('mongoose');

// const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'name не может содержать меньше 2 символов'],
      maxlength: [30, 'name не может содержать больше 30 символов'],
      required: [true, 'заполните поле name'],
    },
    about: {
      type: String,
      minlength: [2, 'about не может содержать меньше 2 символов'],
      maxlength: [30, 'about не может содержать больше 30 символов'],
      required: [true, 'заполните поле about'],
    },
    avatar: {
      type: String,
      required: [true, 'заполните поле avatar'],
    },
  },
);

module.exports = mongoose.model('user', userSchema);
