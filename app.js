/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');

const app = express();
// const {PORT = (3000+Math.floor(Math.random()*100))} = process.env;
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { notFound } = require('./handlers/errorCodes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => { console.log('database ok'); })
  .catch(() => { console.log('database err'); });

app.use((req, res, next) => {
  req.user = {
    _id: '64476162f444e9ad1dd49c83',
  };
  next();
});

app.use(express.json());
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use((req, res, next) => {
  next(res.status(notFound).send({ message: 'URL not found' }));
});
// eslint-disable-next-line no-console
app.listen(PORT, () => { console.log(`start server:${PORT}`); });
