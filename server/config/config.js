//Set the Heroku NODE_ENV variable to test the database:
var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  // console.log(config);
  var envConfig = config[env];
  //We use the 'Object.keys' function that takes an object and return their keys as an array:
  // console.log(Object.keys(envConfig));
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}

//Set the if statements for the env variables:
// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/todoApp';
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/todoAppTest';
// }
