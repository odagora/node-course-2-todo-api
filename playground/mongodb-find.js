//Require the node mongodb native library:
// const MongoClient = require('mongodb').MongoClient;

//If we use the object destructuring we can do as follows and pull extra data from the mongodb library:
const {MongoClient, ObjectID} = require('mongodb');

//Create a connection to the database. It takes two arguments: first the url and second the callback:
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  //We handle first the errors. When we return the console.log message we prevent to continue the code execution if an error occurs in this case:
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

//To filter by completed key:
  // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  //To filter by _id we need to use the 'ObjectID' property set at the beginning:
  // db.collection('Todos').find({
  //   _id: new ObjectID('5b1706e851bc052130cebdbf')}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  //To use some methos like 'count' available for the node.js MongoDB Driver API' as seen in 'http://mongodb.github.io/node-mongodb-native/2.2/api/index.html':

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  //To query by user's name:
  db.collection('Users').find({name: 'Daniel'}).toArray().then((docs) => {
    console.log('User:');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  //Close the connection:
  db.close();
});
