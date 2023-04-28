const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, 'name не может содержать меньше 2 символов'],
      maxlength: [30, 'name не может содержать больше 30 символов'],
      required: [true, 'заполните поле name'],
    },
    link: {
      type: String,
      required: [true, 'заполните поле link'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'не заполнено поле owner'],
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model('card', cardSchema);
