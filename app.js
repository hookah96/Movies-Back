const mysql = require('mysql');
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const usersReactionsRouter = require('./routes/usersReactions');
const authRouter = require('./routes/auth');

const app = express();

const PORT = 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ENABLE CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(
  cookieSession({
    name: 'session',
    keys: ['Movies'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use('/movies', moviesRouter);
app.use('/users', usersRouter);
app.use('/users-reactions', usersReactionsRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}.`);
});

module.exports = app;
