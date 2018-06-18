const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//New user mongoose schema:
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    //Check that the email is unique:
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  //Unique functionality in noSQL DB:
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//To control the data returned to the user, we use the .pick method of lodash inside of a conventional function. This is an instance method:
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

//We grab the 'UserSchema' object into the 'user' variable using a conventional function because we need the 'this' operator. This is an instance method:
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  //We generate the token similar as we did in the 'hashing.js' file:
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  //All data is generated, next we update the information:
  user.tokens = user.tokens.concat([{access, token}]);
  //User information generation:
  return user.save().then(() => {
    return token;
  });
};

//'findByToken' Model method creation. For this type of methods we use the 'statics' word:
UserSchema.statics.findByToken = function (token) {
  var User = this;
  //Undefined variable definition:
  var decoded;
  //We use the try and catch methods because the jwt.verify method throws an error if not valid:
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

//'findByCredentials' Model for user's login:
UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
            resolve(user);
        }
        else{
          reject();
        }
      });
    });
  });
};

//Mongoose Middleware method to be triggered before user's data saving. We use a conventional function to have access to the 'this' binding:
UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }
  else {
    next();
  }
});

//User model creation:
var User = mongoose.model('User', UserSchema);

module.exports = {User};

// var user = new User({
//   email: '  example@example.com  '
// });
//
// user.save().then((doc) => {
//   console.log('User saved', doc);
// }, (e) => {
//   console.log('Unable to save user', e);
// });
