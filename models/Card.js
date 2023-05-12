const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'name must be between 2 and 30 characters',
      },
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (url) => /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i.test(url),
        message: 'enter URL',
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
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
