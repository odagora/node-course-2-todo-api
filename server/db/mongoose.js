var mongoose = require('mongoose');

//We tell mongoose to use the built-in promise library:
mongoose.Promise = global.Promise;

//We connect to database:
mongoose.connect('mongodb://localhost:27017/todoApp');

module.exports = {mongoose};
