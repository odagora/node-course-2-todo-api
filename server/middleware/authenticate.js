var {User} = require('./../models/user');

//Middleware definition:
var authenticate = (req, res, next) => {
  //We grab the 'x-auth' token created with the user:
  var token = req.header('x-auth');

  //Use of 'findByToken' model method to compare the tokens value:
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    //Define 'next()' for the code to continue, otherwise it loops infinitely:
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
