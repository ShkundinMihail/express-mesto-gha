/* eslint-disable no-console */
const express = require('express');

const app = express();
// const {PORT = (3000+Math.floor(Math.random()*100))} = process.env;
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { notFound } = require('./errors/errorCodes');
const { loginUser, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  createUserValidation,
  loginValidation,
} = require('./validationJoy/validationUser');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => { console.log('database ok'); })
  .catch(() => { console.log('database err'); });

app.use(cookieParser());
app.use(express.json());
app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, loginUser);

app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);

app.use((req, res, next) => {
  next(res.status(notFound).send({ message: 'URL not found' }));
});

app.listen(PORT, () => { console.log(`start server:${PORT}`); });
