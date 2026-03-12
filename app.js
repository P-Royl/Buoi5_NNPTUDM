var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/categories', require('./routes/categories'));

// MongoDB Atlas connection
mongoose.connect(
"mongodb+srv://hoangphi0908336492_db_user:abc12345678@cluster0.f75tjvt.mongodb.net/NNPTUD-C5?retryWrites=true&w=majority"
)
.then(() => {
console.log("MongoDB Atlas connected");
})
.catch((err) => {
console.log("MongoDB connection error:", err);
});

// MongoDB events
mongoose.connection.on("connected", () => {
console.log("MongoDB connected event");
});

mongoose.connection.on("disconnected", () => {
console.log("MongoDB disconnected");
});

// 404 handler
app.use(function (req, res, next) {
next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
res.status(err.status || 500).json({
message: err.message,
error: err
});
});

module.exports = app;
