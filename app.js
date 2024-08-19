var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var todosRouter = require('./routes/todos');
var usersRouter = require('./routes/users');  // Import the users route

var app = express();
app.use(cors({
  origin: 'http://localhost:5173',  // replace with your frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todos', todosRouter);
app.use('/users', usersRouter);  // Use the users route

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  next(createError(err.status || 500));
});

module.exports = app;
