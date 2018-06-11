var mongoose = require('mongoose');

//We tell mongoose to use the built-in promise library:
mongoose.Promise = global.Promise;

//We connect to database in local environment or in Heroku:
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
