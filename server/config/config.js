//Set the Heroku NODE_ENV variable to test the database:
var env = process.env.NODE_ENV || 'development';

//Set the if statements for the env variables:
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todoAppTest';
}
